const express = require('express');
const fs = require('fs'); // 引入檔案系統模組 (File System)
const app = express();
const port = 3000;
const DATA_FILE = './users.json'; // 定義資料儲存的位置

app.use(express.json()); 
app.use(express.static('./')); 

// --- 輔助函式：讀取與儲存資料 ---

// 1. 從檔案讀取使用者資料 (Load users from file)
const loadUsers = () => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
        return []; // 如果檔案不存在，回傳空陣列
    } catch (error) {
        console.error("讀取資料失敗：", error);
        return [];
    }
};

// 2. 將使用者資料寫入檔案 (Save users to file)
const saveUsers = (users) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error("儲存資料失敗：", error);
    }
};

// 初始化：從檔案載入資料到記憶體
let users = loadUsers(); 

// 1. 註冊 API
app.post('/api/register', (req, res) => {
    const { email, password, name, catName, phone } = req.body;
    
    // 重新從檔案檢查，確保資料同步
    users = loadUsers();
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ success: false, message: "這個 Email 已經註冊過囉喵！" });
    }

    const newUser = { email, password, name, catName, phone: phone || "" };
    users.push(newUser);
    
    saveUsers(users); // ✨ 存檔到硬碟
    
    console.log(`新成員：${email} 註冊成功`);
    res.json({ success: true, message: "註冊成功！歡迎加入喵窩 🐾" });
});

// 2. 登入 API
app.post('/api/login', (req, res) => {
    users = loadUsers(); // 確保讀取的是最新資料
    const { email, password } = req.body;
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
        res.json({ success: true, message: "歡迎回來喵！", user: foundUser });
    } else {
        res.status(401).json({ success: false, message: "帳號或密碼錯誤！😿" });
    }
});

// 3. 更新個人資料 API
app.post('/api/update-profile', (req, res) => {
    const { email, name, catName, phone } = req.body;
    users = loadUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].catName = catName;
        users[userIndex].phone = phone; 
        
        saveUsers(users); // 更新後存檔
        res.json({ success: true, message: "資料更新成功喵！🐾", user: users[userIndex] });
    } else {
        res.status(404).json({ success: false, message: "找不到使用者資料😿" });
    }
});

// 4. 重設密碼 API
app.post('/api/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    users = loadUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        saveUsers(users); // 修改密碼後存檔
        res.json({ success: true, message: "密碼重設成功！" });
    } else {
        res.status(404).json({ success: false, message: "找不到帳號喔！" });
    }
});

app.listen(port, () => {
    console.log(`喵窩伺服器已啟動：http://localhost:${port}`);
});