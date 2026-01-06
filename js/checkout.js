// 1. 全台灣 22 縣市資料
const taiwanData = {
    "台北市": { "中正區": "100", "大同區": "103", "中山區": "104", "松山區": "105", "大安區": "106", "萬華區": "108", "信義區": "110", "士林區": "111", "北投區": "112", "內湖區": "114", "南港區": "115", "文山區": "116" },
    "新北市": { "板橋區": "220", "三重區": "241", "中和區": "235", "永和區": "234", "新莊區": "242", "淡水區": "251" },
    "桃園市": { "桃園區": "330", "中壢區": "320", "平鎮區": "324", "八德區": "334" },
    "台中市": { "西屯區": "407", "北屯區": "406", "南屯區": "408", "西區": "403" },
    "台南市": { "東區": "701", "安平區": "708", "中西區": "700" },
    "高雄市": { "苓雅區": "802", "新興區": "800", "前金區": "801", "三民區": "807", "左營區": "813" },
    "基隆市": { "仁愛區": "200", "信義區": "201" },
    "新竹市": { "東區": "300", "北區": "300", "香山區": "300" },
    "嘉義市": { "東區": "600", "西區": "600" },
    "新竹縣": { "竹北市": "302", "竹東鎮": "310" },
    "苗栗縣": { "苗栗市": "360", "頭份市": "351" },
    "彰化縣": { "彰化市": "500", "員林市": "510" },
    "南投縣": { "南投市": "540", "草屯鎮": "542" },
    "雲林縣": { "斗六市": "640", "虎尾鎮": "632" },
    "嘉義縣": { "太保市": "612", "民雄鄉": "621" },
    "屏東縣": { "屏東市": "900", "潮州鎮": "920" },
    "宜蘭縣": { "宜蘭市": "260", "羅東鎮": "265" },
    "花蓮縣": { "花蓮市": "970", "吉安鄉": "973" },
    "台東縣": { "台東市": "950" },
    "澎湖縣": { "馬公市": "880" },
    "金門縣": { "金門鎮": "893" },
    "連江縣": { "南竿鄉": "209" }
};

// 2. 初始化：載入縣市選單
function initCheckout() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        alert("喵嗚... 請先登入會員才能幫主子結帳喔！🐾");
        window.location.href = 'member.html'; 
        return;
    }

    // 預設執行一次：因為 HTML 預設勾選「常用資料」
    toggleInfoSource('member');

    // 渲染原本的其他功能
    renderCheckoutSummary();
    const citySelect = document.getElementById('city-select');
    if (citySelect) {
        Object.keys(taiwanData).forEach(city => {
            let opt = document.createElement('option');
            opt.value = city; opt.innerHTML = city;
            citySelect.appendChild(opt);
        });
    }
}

// 切換收件資訊來源的邏輯
function toggleInfoSource(source) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const nameInput = document.getElementById('cust-name');
    const phoneInput = document.getElementById('cust-phone');

    if (source === 'member') {
        nameInput.value = user.name || "";
        phoneInput.value = user.phone || "";
        nameInput.readOnly = true;
        phoneInput.readOnly = true;
        nameInput.style.backgroundColor = "#f9f9f9";
        phoneInput.style.backgroundColor = "#f9f9f9";
    } else {
        nameInput.value = "";
        phoneInput.value = "";
        nameInput.readOnly = false;
        phoneInput.readOnly = false;
        nameInput.style.backgroundColor = "#fff";
        phoneInput.style.backgroundColor = "#fff";
    }
}
// 3. 更新區域選單
function updateDistricts() {
    const city = document.getElementById('city-select').value;
    const distSelect = document.getElementById('district-select');
    const zipInput = document.getElementById('zip-code');
    
    distSelect.innerHTML = '<option value="">區域</option>';
    zipInput.value = '';

    if (city && taiwanData[city]) {
        Object.keys(taiwanData[city]).forEach(dist => {
            let opt = document.createElement('option');
            opt.value = dist;
            opt.innerHTML = dist;
            distSelect.appendChild(opt);
        });
    }
}

// 4. 更新郵遞區號
function updateZipCode() {
    const city = document.getElementById('city-select').value;
    const dist = document.getElementById('district-select').value;
    const zipInput = document.getElementById('zip-code');
    if (city && dist) {
        zipInput.value = taiwanData[city][dist];
    }
}

// 5. 渲染訂單摘要 (含圖片與增減按鈕) 
function renderCheckoutSummary() {
    const listContainer = document.getElementById('checkout-items-list');
    const totalDisplay = document.getElementById('checkout-total-display');
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let total = 0;

    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        listContainer.innerHTML += `
            <div class="checkout-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="checkout-item-info">
                    <div style="font-weight:bold;">${item.name}</div>
                    <div style="color:#ee5253; font-weight:bold;">$${item.price}</div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button onclick="changeCheckoutQty(${index}, -1)" class="qty-btn">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeCheckoutQty(${index}, 1)" class="qty-btn">+</button>
                </div>
                <div style="font-weight:bold; min-width: 60px; text-align: right;">$${subtotal}</div>
            </div>`;
    });
    if (totalDisplay) totalDisplay.innerText = "$" + total;
}

// 6. 結帳頁面增減數量邏輯
function changeCheckoutQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart[index].qty = parseInt(cart[index].qty) + delta;
    
    // 如果減到 0 就直接從購物車移除
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCheckoutSummary();
    
    // 也要同步更新 nav 上的購物車小紅點 (如果妳有引入 cart.js 的話)
    if (typeof updateCartUI === "function") {
        updateCartUI();
    }
}

// 7. 下單邏輯 
function placeOrder() {
    // --- 1. 抓取基本收件資訊 ---
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const city = document.getElementById('city-select').value;
    const dist = document.getElementById('district-select').value;
    const addressDetail = document.getElementById('cust-address-detail').value;
    const payment = document.getElementById('payment-method').value;
    const invType = document.getElementById('invoice-type').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // 1. 基本收件資訊檢查
    if (!name || !phone || !city || !dist || !addressDetail) {
        alert('要把收件資訊填滿，物流喵才找得到妳喔！🐾');
        return;
    }
    // 2. 電話格式檢查 (一定要 09 開頭且總共 10 位數)
    const phoneRegex = /^09\d{8}$/; 
    if (!phoneRegex.test(phone)) {
        alert('電話格式不對喔！一定要是 09 開頭的 10 位數字，物流喵才打得通啦！📞');
        return;
    }

    // --- 2. 付款細節驗證 ---
    let paymentDetail = ""; 
    if (payment === '信用卡') {
        const cardNo = document.getElementById('card-number').value;
        const cardExp = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        if (cardNo.length < 16 || !cardExp || !cardCvv) {
            alert('卡片資訊沒填對，主子會拒收喔！💳');
            return;
        }
        paymentDetail = "信用卡: **** " + cardNo.slice(-4);
    } else if (payment === '銀行轉帳') {
        const lastFive = document.getElementById('bank-last-five').value;
        if (lastFive.length !== 5) {
            alert('轉帳後五碼要是 5 位數字喔！💰');
            return;
        }
        paymentDetail = "轉帳後五碼: " + lastFive;
    } else {
        paymentDetail = "貨到付款";
    }

    // --- 3. 發票資訊驗證 (新增手機載具邏輯) ---
    let invDetail = invType;
    if (invType === '手機載具') {
        const barcode = document.getElementById('invoice-mobile-barcode').value;
        const barcodeRegex = /^\/[0-9A-Z.+-]{7}$/; // 驗證 / 開頭 + 7碼
        if (!barcodeRegex.test(barcode)) {
            alert('載具格式不對喔！要有 / 開頭且總共 8 碼。');
            return;
        }
        invDetail = `手機載具: ${barcode}`;
    } else if (invType === '公司三聯式') {
        const taxId = document.getElementById('invoice-tax-id').value;
        const title = document.getElementById('invoice-company-title').value;
        if (taxId.length !== 8 || !title) {
            alert('統編要是 8 位數字，抬頭也要填喔！');
            return;
        }
        invDetail = `公司用 - 統編: ${taxId}, 抬頭: ${title}`;
    } else if (invType === '捐贈發票') {
        const loveCode = document.getElementById('invoice-love-code').value;
        if (!loveCode) {
            alert('捐發票也要填愛心碼喔！喵～');
            return;
        }
        invDetail = `捐贈 - 愛心碼: ${loveCode}`;
    }

    // --- 4. 檢查購物車與計算總額 ---
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    if (cart.length === 0) { alert('購物車空空的耶？'); return; }
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // --- 5. 建立訂單物件 (這要在存檔前做！) ---
    const order = { 
        orderId: "MEOW" + Date.now(), 
        customer: { name, phone, address: city + dist + addressDetail ,email: currentUser.email}, 
        paymentMethod: payment,
        paymentDetail: paymentDetail, 
        invoice: invDetail,
        items: cart, 
        orderDate: new Date().toLocaleString(), 
        totalAmount: total 
    };

    // --- 6. 存入訂單紀錄並跳轉 ---
    let history = JSON.parse(localStorage.getItem('orderHistory')) || [];
    history.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(history));
    localStorage.removeItem('myCart'); 
    
    alert('訂單已成功送出！🚀 奴才快去準備罐罐吧！');
    window.location.href = 'member-history.html'; 
}

// 8. 顯示/隱藏付款資訊 
function togglePaymentFields() {
    const payment = document.getElementById('payment-method').value;
    document.getElementById('credit-card-info').style.display = (payment === '信用卡') ? 'block' : 'none';
    document.getElementById('bank-transfer-info').style.display = (payment === '銀行轉帳') ? 'block' : 'none';
}

// 9. 顯示/隱藏發票資訊 (新增載具切換)
function toggleInvoiceFields() {
    const type = document.getElementById('invoice-type').value;
    // 根據選擇顯示對應區塊，其餘隱藏
    document.getElementById('invoice-barcode-info').style.display = (type === '手機載具') ? 'block' : 'none';
    document.getElementById('invoice-company-info').style.display = (type === '公司三聯式') ? 'block' : 'none';
    document.getElementById('invoice-donation-info').style.display = (type === '捐贈發票') ? 'block' : 'none';
}
window.onload = initCheckout;