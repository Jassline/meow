// MEOW SELECT 購物車核心邏輯 - 最終修復版
// 統一使用 'myCart' 作為 LocalStorage Key

function updateCartUI() {
    const container = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('cart-total-display');
    const badge = document.getElementById('cart-badge');
    
    // 抓取資料，確保欄位名稱統一
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let total = 0;
    let itemCount = 0; 
    
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:50px 20px;">
                <p style="color:#999; margin-bottom:15px;">購物車是空的 😿</p>
                <a href="shop.html" style="background:#ff9f43; color:white; padding:8px 20px; border-radius:20px; text-decoration:none; font-size:14px;">去逛逛吧</a>
            </div>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            itemCount += parseInt(item.qty);
            container.innerHTML += `
                <div class="item" style="padding: 15px 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f9f9f9;">
                    <div style="display:flex; align-items:center; flex:1;">
                        <img src="${item.img}" style="width:50px; height:50px; margin-right:10px; object-fit:cover; border-radius:5px;">
                        <div style="flex:1;">
                            <div style="font-size:13px; font-weight:bold;">${item.name}</div>
                            <div style="font-size:12px; color:#ee5253; font-weight:bold;">$${item.price}</div>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:5px; margin: 0 10px;">
                        <button onclick="changeQty(${index}, -1)" class="qty-btn">-</button>
                        <span style="min-width:20px; text-align:center;">${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)" class="qty-btn">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#999; cursor:pointer; font-size:12px;">刪除</button>
                </div>`;
        });
    }

    if (totalDisplay) totalDisplay.innerText = "$" + total;
    updateCartBadge(itemCount); 
}

// 加入購物車功能 (給 product-detail.html 使用)
function addToCart(name, price, img, qty = 1) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty = parseInt(existingItem.qty) + parseInt(qty);
    } else {
        cart.push({
            name: name,
            price: price,
            img: img,
            qty: parseInt(qty)
        });
    }
    
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartUI();
    showNotice(`已將 ${name} 加入購物袋！🐾`);
}

function changeQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart[index].qty = parseInt(cart[index].qty) + delta;
    if (cart[index].qty <= 0) {
        removeFromCart(index);
    } else {
        localStorage.setItem('myCart', JSON.stringify(cart));
        updateCartUI();
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartBadge(count) {
    let badge = document.getElementById('cart-badge');
    if (!badge) {
        const btn = document.getElementById('cart-btn');
        if (btn) {
            btn.style.position = 'relative';
            btn.innerHTML += `<span id="cart-badge" style="position:absolute; top:-5px; right:-5px; background:#ee5253; color:white; font-size:10px; border-radius:50%; width:18px; height:18px; display:flex; align-items:center; justify-content:center; border:2px solid white;">0</span>`;
            badge = document.getElementById('cart-badge');
        }
    }
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function showNotice(msg) {
    const notice = document.createElement('div');
    notice.className = 'fixed-notice'; // 記得在 CSS 加樣式
    notice.style = "position:fixed; bottom:20px; right:20px; background:#333; color:white; padding:10px 20px; border-radius:8px; z-index:9999;";
    notice.innerText = msg;
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 2000);
}

// 初始化與監聽
$(document).ready(function() {
    updateCartUI(); 
    
    // 打開側欄
    $("#cart-btn").on('click', function(e) {
        e.preventDefault();
        updateCartUI();
        $(".overlay").addClass("open");      
        $(".cart-sidebar").addClass("open"); 
    });

    // 關閉側欄
    $("#close-btn, .overlay").on('click', function() {
        $(".overlay").removeClass("open");      
        $(".cart-sidebar").removeClass("open"); 
    });
});