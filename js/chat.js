// 1. 會員登入相關判斷與登出功能
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const CHAT_STORAGE_KEY = currentUser ? `chat_history_${currentUser.email}` : 'chat_history_guest';

// 提供給 member.js 或 nav 呼叫的登出功能
function logout() {
    // 登出時可以選擇是否清空紀錄（通常為了隱私建議清空）
    // localStorage.removeItem(CHAT_STORAGE_KEY); 
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

(function() {
    // 1. 注入 HTML 構造到 body 結尾
    const chatHTML = `
        <div id="meow-chat-trigger" title="點我找喵務大臣">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="white"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm-3-8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-3 4c1.46 0 2.73-.83 3.37-2H8.63c.64 1.17 1.91 2 3.37 2z"/></svg>
        </div>
        <div id="meow-chat-window">
            <div class="resizer-tl"></div>
            <div class="chat-header">
                <span>🐾 喵務大臣助理</span>
                <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">&times;</button>
            </div>
            <div class="chat-messages" id="chat-msgs">
                </div>
            <div class="typing-status" id="typing-st">大臣正在翻閱小抄... 🐾</div>
            <form class="chat-input-area" id="chat-box-form">
                <input type="text" class="chat-input" id="chat-in" placeholder="問問看：現在有什麼優惠？" required autocomplete="off">
                <button type="submit" class="chat-send-btn">發送</button>
            </form>
        </div>
    `;
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = chatHTML;
    document.body.appendChild(chatContainer);
    const win = document.getElementById('meow-chat-window');
    const resizer = win.querySelector('.resizer-tl');

    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        window.addEventListener('mousemove', resizeWindow);
        window.addEventListener('mouseup', stopResizing);
    });

    function resizeWindow(e) {
        const rect = win.getBoundingClientRect();
        
        // 因為視窗是固定在 bottom/right 20px，所以：
        // 往左拉 (e.clientX 變小) -> 寬度變大
        // 往上拉 (e.clientY 變小) -> 高度變大
        const newWidth = rect.right - e.clientX;
        const newHeight = rect.bottom - e.clientY;

        // 設定最小縮放限制，避免拉到不見
        if (newWidth > 300) win.style.width = newWidth + 'px';
        if (newHeight > 350) win.style.height = newHeight + 'px';
    }

    function stopResizing() {
        window.removeEventListener('mousemove', resizeWindow);
        window.removeEventListener('mouseup', stopResizing);
    }

    // 2. API 配置
    const apiKey = "AIzaSyAMypr06NU8ozBpyHQWl3OxqXz4lHQ8eG8"; 
    const modelName = "gemini-2.5-flash-preview-09-2025";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    
    // ✨ 核心變動：從 localStorage 載入歷史紀錄
    let history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];

    const msgsContainer = document.getElementById('chat-msgs');

    // 渲染對話到畫面的函數
    function renderHistory() {
        msgsContainer.innerHTML = '';
        if (history.length === 0) {
            msgsContainer.innerHTML = `<div class="msg msg-bot">喵嗚！我是大臣。我可以幫妳看網頁資訊喔，想問什麼優惠或產品嗎？喵～</div>`;
        } else {
            history.forEach(item => {
                const roleClass = (item.role === 'user') ? 'msg-user' : 'msg-bot';
                // 這裡要判斷是因為存檔格式可能包含 context 字串，顯示時只拿最後一條訊息
                let displayText = item.parts[0].text;
                if (item.role === 'user' && displayText.includes('【客人的提問】：')) {
                    displayText = displayText.split('【客人的提問】：')[1];
                }
                msgsContainer.innerHTML += `<div class="msg ${roleClass}">${displayText}</div>`;
            });
        }
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }

    // 初始化渲染
    renderHistory();

    // 自動抓取網頁內容作為 AI 背景
    function getWebsiteContext() {
        const title = document.title;
        const mainContent = document.body.innerText.replace(/\s+/g, ' ').substring(0, 1000);
        return `妳在瀏覽的頁面是：${title}。網頁目前的文字內容如下：${mainContent}。另外請務必記住：全站滿 $1000 免運，沒滿就要收運費。團隊成員有吳書慧、廖鈺瑄、陳欣怡、黃沛慈。`;
    }

    const sysPrompt = "妳是 MEOW SELECT 的 AI 喵務大臣。妳的語氣要溫和可愛，結尾常帶『喵～』，回覆時請妳務必乾淨整潔，要換行，不要全部擠在一起 。妳必須根據『網頁內容』來回答問題，若網頁沒寫，請告知客人會去請示老闆或 請客人直接連絡老闆email:bb942w@gmail.com，嚴禁編造不存在的優惠。妳的目標是引導客人去商店逛逛。";

    // 3. 事件綁定
    const trigger = document.getElementById('meow-chat-trigger');
    const windowEl = document.getElementById('meow-chat-window');
    const closeBtn = document.getElementById('close-chat');

    if (trigger) trigger.onclick = () => windowEl.classList.toggle('active');
    if (closeBtn) closeBtn.onclick = () => windowEl.classList.remove('active');

    // 4. 發送訊息邏輯
    const chatForm = document.getElementById('chat-box-form');
    if (chatForm) {
        chatForm.onsubmit = async function(e) {
            e.preventDefault();
            const input = document.getElementById('chat-in');
            const typing = document.getElementById('typing-st');
            const msg = input.value.trim();
            if(!msg) return;

            // 顯示用戶訊息
            msgsContainer.innerHTML += `<div class="msg msg-user">${msg}</div>`;
            input.value = '';
            typing.style.display = 'block';
            msgsContainer.scrollTop = msgsContainer.scrollHeight;

            try {
                const context = getWebsiteContext();
                const userContent = { 
                    role: "user", 
                    parts: [{ text: `【當前網頁內容】：${context}\n【客人的提問】：${msg}` }] 
                };

                const resp = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: history.concat([userContent]),
                        systemInstruction: { parts: [{ text: sysPrompt }] }
                    })
                });
                
                if (!resp.ok) throw new Error('API 連連線失敗');
                
                const data = await resp.json();
                const reply = data.candidates[0].content.parts[0].text;
                
                typing.style.display = 'none';
                msgsContainer.innerHTML += `<div class="msg msg-bot">${reply}</div>`;
                
                // ✨ 關鍵更新：存入歷史紀錄並寫入 localStorage
                history.push({ role: "user", parts: [{ text: `【客人的提問】：${msg}` }] }); // 存的時候簡化一下
                history.push({ role: "model", parts: [{ text: reply }] });
                localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));

            } catch (err) {
                console.error(err);
                typing.style.display = 'none';
                msgsContainer.innerHTML += `<div class="msg msg-bot">喵嗚...網路好像被貓叼走了，請再試一次喵！</div>`;
            }
            msgsContainer.scrollTop = msgsContainer.scrollHeight;
        };
    }
})();