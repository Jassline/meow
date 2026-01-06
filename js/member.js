document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const profileForm = document.getElementById('profileForm');
    const registerForm = document.getElementById('registerForm');
    const authCard = document.querySelector('.auth-card'); 
    const infoSection = document.querySelector('.info-section'); 

    // 1. 檢查登入狀態 (sessionStorage)
    const checkLoginStatus = () => {
        const savedUser = sessionStorage.getItem('currentUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (authCard) authCard.style.display = 'none';
            if (infoSection) infoSection.style.display = 'block';
            
            if (document.getElementById('ownerName')) document.getElementById('ownerName').value = user.name || '';
            if (document.getElementById('catName')) document.getElementById('catName').value = user.catName || '';
            if (document.getElementById('phoneNum')) document.getElementById('phoneNum').value = user.phone || '';
        } else {
            if (authCard) authCard.style.display = 'block';
            if (infoSection) infoSection.style.display = 'none';
        }
    };
    checkLoginStatus();

    // 2. 註冊功能
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const name = document.getElementById('regOwnerName').value;
            const catName = document.getElementById('regCatName').value;
            const phone = document.getElementById('regPhone').value;

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name, catName, phone })
                });
                const result = await response.json();

                if (result.success) {
                    alert('註冊成功！歡迎加入喵窩 🐾');
                    window.location.href = 'member.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('註冊連線失敗，請檢查伺服器！');
            }
        });
    }

    // 3. 登入功能
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    sessionStorage.setItem('currentUser', JSON.stringify(result.user));
                    location.reload(); 
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('登入連線失敗喵！');
            }
        });
    }

    // 4. 更新個人資料
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            if (!currentUser) return;

            const updatedData = {
                email: currentUser.email,
                name: document.getElementById('ownerName').value,
                catName: document.getElementById('catName').value,
                phone: document.getElementById('phoneNum').value
            };

            try {
                const response = await fetch('/api/update-profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                });
                const result = await response.json();
                if (result.success) {
                    alert(result.message);
                    sessionStorage.setItem('currentUser', JSON.stringify(result.user));
                }
            } catch (error) {
                alert('更新連線失敗！');
            }
        });
    }

    // 5. 登出 (Logout)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // 清除使用者身分
            sessionStorage.removeItem('currentUser');
            
            // 這裡要對應 cart.js 的名稱 'myCart'
            localStorage.removeItem('myCart'); 
            
            alert('已登出並清空購物車，歡迎下次再來玩喵！🐾');
            location.reload();
        });
    }
});