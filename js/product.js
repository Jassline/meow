/* MEOW SELECT 商品資料庫
   包含：基本資訊、適配度評分、詳細介紹、年齡分類
*/

window.products= {
   "1": {
    name: "零感除臭系列木薯混合貓砂",
    defaultPrice: 170,
    desc: "根源除臭，長效抑菌。",
    img: "../img/commodity-photo/catlitterone.jpg",
    suitKitten: 5,suitAdult: 5,suitSenior: 5,
    fullDetail: "成分：木薯澱粉、玉米澱粉、鈉基礦石等。<br>來源：台灣<br>特色：自研超導瞬吸配比，1秒吸水3秒結團，沾底貼邊說byebye。",
     age: ["adult","senior","kitten"],
    variants: [
        { weight: "5KG", price:350  },
        { weight: "7KG", price: 485 },
        { weight: "10KG", price: 685 }
    ]
},

    "2": {
        name: "檸檬除臭結團低塵貓砂",
        defaultPrice: 150,
        desc: "天然酵素根源除臭。",
        img: "../img/commodity-photo/catlittertwo.jpg",
        suitKitten: 5, suitAdult: 5, suitSenior: 5,
        fullDetail: "成分：膨潤土、天然礦物質。<br>來源：台灣<br>特色：合理配比，全包裹結團。",
        age: ["adult","senior","kitten"],
        variants: [
        { weight: "2.5KG", price: 150 },
        { weight: "6KG", price: 350 },
        { weight: "10KG", price: 550 }
    ]
    },
   "3": {
    name: "鮮味貓罐頭",
    defaultPrice: 30,
    desc: "嚴選多種口味，牛礦酸+魚油+多種維生素助力貓咪生長發育",
    img: "../img/commodity-photo/catfoodone.jpg",
    age: ["adult","senior","kitten"],
    fullDetail: "成分：新鮮鮪魚/雞肉/鮭魚、純淨水、牛磺酸、維生素E、維生素A。<br>建議餵食量:1-4kg 1-2罐/日，4kg以上2-3罐/日<br><br>來源：台灣。<br>特色：不用合成肉、不用邊角料，人食級肉源，主子吃得安心。",
    suitKitten: 4, suitAdult: 5, suitSenior: 5,
    
    // 支援口味 + 數量組合的清單
    variants: [
        { flavor: "鮪魚", pack: "單罐", price: 30 },
        { flavor: "鮪魚", pack: "6入", price: 180 },
        { flavor: "鮪魚", pack: "12入", price: 350 },

        { flavor: "雞肉", pack: "單罐", price: 30 },
        { flavor: "雞肉", pack: "6入", price: 180 },
        { flavor: "雞肉", pack: "12入", price: 350 },

        { flavor: "鮭魚", pack: "單罐", price: 30 },
        { flavor: "鮭魚", pack: "6入", price: 180 },
        { flavor: "鮭魚", pack: "12入", price: 350 }
    ]
},

    "4": {
        name: "幻影逗貓棒",
        price: 50,
        desc: "總長180cm可收縮增加靈動性。",
        img: "../img/commodity-photo/four.jpg",
        hasFlavor: true,
        suitKitten: 5, suitAdult: 4, suitSenior: 2,
        fullDetail: "材質：碳纖維桿、天然羽毛、無毒染料。<br>來源：品牌自製。<br>特色：高彈力桿身，怎麼揮都不容易斷。",
        age: ["adult","kitten"],
    },

    /*  幼貓用品 (5-9) */
    "5": {
        name: "幼貓1-12個月專用糧",
        desc: "高肉營養，健康生長。",
        img: "../img/commodity-photo/five.jpg",
        suitKitten: 5, suitAdult: 2, suitSenior: 1,
        fullDetail: "成分：雞肉30%、鮭魚22%、全脂羊奶粉1.2%、優質魚油2.5%、海藻、蔓越莓。<br>特色：特別添加全脂羊奶，8重因子助力免疫。",
        age: ["kitten"],
        variants: [
        { weight: "2KG", price: 970 },
        { weight: "6KG", price: 2560 },
        { weight: "10KG", price: 4120 },
        ]
    },
    "6": {
        name: "幼貓專用奶粉",
        price: 360,
        desc: "科學配比接近接近母乳結構，卓越消化率98.6%。",
        img: "../img/commodity-photo/six.jpg",
        suitKitten: 5, suitAdult: 1, suitSenior: 1,
        fullDetail: "成分：酪蛋白、豆油、脫脂牛奶粉、濃縮乳清蛋白。<br>來源：北美A級純淨牧場。",
        age: ["kitten"],
         variants: [
        { weight: "170g", price: 750 },
        { weight: "340g", price: 1100 },
        ]
    },
    "7": {
        name: "幼貓化毛膏120g",
        price: 350,
        desc: "0糖0脂 輕鬆排毛。",
        img: "../img/commodity-photo/seven.jpg",
        suitKitten: 5, suitAdult: 3, suitSenior: 4,
        fullDetail: "成分:釀酒酵母提取物、膠原蛋白、透明質酸<br>用量參考(天)：<2kg 1-3cm、2-5kg 3-5cm、>5kg 5-8cm",
        age: ["kitten"]
    },
    "8": {
        name: "磨牙棒",
        desc: "提神醒腦、有助牙清潔。",
        img: "../img/commodity-photo/eight.jpg",
        suitKitten: 4, suitAdult: 5, suitSenior: 3,
        fullDetail: "材質：貓薄荷、蟲癭草、麻繩。<br>注意事項:建議3個月以上貓咪使用。",
        age: ["adult","kitten"],
         variants: [
        { weight: "1入", price: 30 },
        { weight: "10入", price: 300 },
        { weight: "12入", price: 340 }
    ]
    },
    "9": {
        name: "幼貓專用沐浴露(500ml)",
        price: 350,
        desc: "解決幼貓清潔瘙癢問題 沐浴露+護毛素二合一",
        img: "../img/commodity-photo/nine.jpg",
        suitKitten: 5, suitAdult: 3, suitSenior: 3,
        fullDetail: "成分：去離子水，氨基酸，植物提取物，保濕劑，柔順因子。<br>注意事項:1.寵物敏感程度不一樣，首次使用時，先小面積試用一下，寵物無異常反應後，再正常使用即可：2.在小容器里加水搖與再倒在寵物身上使用效果更佳：3.避免直接接觸寵物的耳鼻眼口處，禁止在寵物臉上直接使用：4.放置在陰涼避光處，禁止兒，重和寵物直接接觸，禁止食用：5.若不慎入眼，請及時用大量清水沖洗，必要時立即就醫；6.務必遵守使用說明，仔細讀，否則使用不當造成的後果，自行承擔。",
        age: ["kitten"]
    },

    /*成貓用品 (10-14) */
    "10": {
        name: "均衡成貓低敏主糧",
        price: 515,
        desc: "適口性佳 腸胃雙護。",
        img: "../img/commodity-photo/ten.jpg",
        suitKitten: 2, suitAdult: 5, suitSenior: 4,
        fullDetail: "成分：鮮雞肉、金槍魚、鮮牛肉、魚油、藍莓、蔓越莓、雞心、釀酒酵母培養、紫薯、鷹嘴豆、胡蘿蔔、南瓜、脫水蘋果、螺旋藻粉。<br>特色:添加多種果蔬，含有蔓越莓、藍莓有助於排除毛球，呵護貓咪泌尿健康，預防泌尿道",
        age: ["adult","senior"],
        variants: [
        { weight: "2.5KG", price: 1050 },
        { weight: "6KG", price: 2395 },
        { weight: "8KG", price: 3000 },
        ]
    },
    "11": {
        name: "不倒翁自動激光逗貓器",
        price: 750,
        desc: "主體機身採用ABS材質，無毒無害，貓咪吸舔，抓撓都不怕。",
        img: "../img/commodity-photo/eleven.jpg",
        suitKitten: 4, suitAdult: 5, suitSenior: 1,
        fullDetail: "材質:ABS<br>產品尺寸:74*74*99mm<br>充電方式：Type-C，具備 15 分鐘自動休眠功能。",
        age: ["adult","kitten"],
    },
    "12": {
        name: "貓咪深海魚油(75ml)",
        price: 420,
        desc: "三合一毛髮養護機制，爆毛+美毛+防掉毛。",
        img: "../img/commodity-photo/twelve.jpg",
        suitKitten: 4, suitAdult: 5, suitSenior: 5,
        fullDetail: "成分：魚油（進口鯷魚油&三文魚油50%）、油料籽實、磷蝦油40000mg/kg。<br>適用寵物：3月齡及以上大貓<br>適用狀況：毛髮質量差、掉毛、皮屑多、貓蘚與皮膚病預防與愈後。<br>餵食量：<5kg 1-2泵/天、 >5kg 2-3泵/天",
        age: ["adult","senior","kitten"],
    },
    "13": {
        name: "順暢化毛膏",
        img: "../img/commodity-photo/twelve.jpg",
        desc: "溫和潤滑腸道排出毛球。",
        img: "../img/commodity-photo/thirteen.jpg",
        suitKitten: 3, suitAdult: 5, suitSenior: 5,
        fullDetail: "成分：純化水、肉類及其製品、魚油、纖維素、全脂牛奶粉<br>特色:補充營養、水分還排毛。",
        age: ["adult","senior"],
        variants: [
        { weight: "20g", price: 110 },
        { weight: "100g", price: 290 },
        ]
    },
    "14": {
        name: "貓用除毛梳",
        price: 180,
        desc: `
<h2>一梳解千結</h2>
<p>寵物愛上的毛髮：快速開結、按摩養膚、握感舒適。</p>
`,

        img: "../img/commodity-photo/fourteen.jpg",
        suitKitten: 5, suitAdult: 5, suitSenior: 5,
        fullDetail: "材質：不鏽鋼細針、原木手柄。<br>清潔步驟：可使用沐浴露清洗，置於通風陰涼處自然晾乾或使用吹風機冷風模式吹乾。",
        age: ["adult","senior","kitten"],
        variants: [
        { weight: "大梳子", price:179},
        { weight: "小梳子", price:149 },
        ]
    },

    /* 熟齡貓專區 (15-19)*/
    "15": {
        name: "中老年酥化貓糧",
        desc: "全新酥化顆粒讓腸胃消化更輕鬆。",
        img: "../img/commodity-photo/fifteen.jpg",
        suitKitten: 1, suitAdult: 3, suitSenior: 5,
        fullDetail: "成分：雞肉、蛋黃粉、鮮雞肝、木薯澱粉、甜菜粕、魚油、磷蝦油、水解酪蛋白、褐藻粉、藍莓、蔓越莓。<br>特色：添加核心成分AKG滋潤毛髮、呵護腸胃、參與代謝。",
        age: ["senior"],
        variants: [
        { weight: "3KG", price:1500 },
        { weight: "5KG", price:2480 },
        { weight: "7KG", price:3490 },
        ]
    },
    "16": {
        name: "中老年貓罐頭4入",
        price: 150,
        desc: `低磷低鈉呵護腎臟
               流質慕斯:易舔食、易消化、吸收率高。`,
        img: "../img/commodity-photo/sixteen.jpg",
        suitKitten: 1, suitAdult: 4, suitSenior: 5,
        fullDetail: "材質：凍金槍魚、鮮雞肉、水、三文魚油、血漿蛋白、纖維素、萬壽菊粉、山藥、莓藍莓、黑莓",
        age: ["adult","senior"],
    },
    "17": {
        name: "貓用關節保健粉",
        price: 2100,
        desc: "天然萃取無添加放心餵安心用，對腸胃虛弱寵物更友善。",
        img: "../img/commodity-photo/seventeen.jpg",
        suitKitten: 5, suitAdult: 5, suitSenior: 5,
        fullDetail: "成分：GOPO、膳食纖維、花青素、B-胡蘿蔔素。<br>適合：各年齡適用，助力寵物關節。",
        age: ["adult","senior","kitten"],
        variants: [
        { weight: "350g", price:1750 },
        { weight: "500g", price: 2100 },
        { weight: "1KG", price: 3000 },
        ]
    },
    "18": {
        name: "四季通用深睡寵物窩",
        price: 495,
        desc: "3D波浪形狀海綿，凹凸有致，均勻釋壓，享受按摩般的舒適體感",
        img: "../img/commodity-photo/eighteen.jpg",
        hasFlavor: true,
        optionLabel: "選擇尺寸",
        options: ["S (5kg內)", "M (10kg內)", "L (30kg內)"],
        suitKitten: 5, suitAdult: 5, suitSenior: 5,
        fullDetail: "材質：聚氨酯、記憶/回彈海綿、聚酯纖維。<br>特色：窩墊的外圍採用高彈海綿封邊包裹，立體塑形，不易倒塌及變形。",
        age: ["adult","senior","kitten"],
    },
    "19": {
        name: "寵物輔助階梯",
        price: 900,
        desc: "幫助年邁貓咪獨自上下沙發或床。",
        img: "../img/commodity-photo/nineteen.jpg",
        suitKitten: 4, suitAdult: 2, suitSenior: 5,
        fullDetail: "材質：雪花絨面料。<br>設計：海綿一體成型穩固不塌陷、科學斜角設計保護腰椎。",
        age: ["senior"],
        variants: [
        { weight: "二階", price:845},
        { weight: "三階", price:980 },
        { weight: "四階", price:1160 },
        { weight: "五階", price:2150 },
        ]
    },

    "20": {
        name: "實木貓爬架",
        price:779 ,
        desc: "體積小巧，放置角落，節省空間",
        img: "../img/commodity-photo/twenty.jpg",
        suitKitten: 1, suitAdult:5 , suitSenior: 3,
        fullDetail: "材質：板材：實木板+實木多層板 抓柱：白麻繩包裹硬紙筒 抓球：白麻繩包裹塑料球<br>產品尺寸：60*40*96cm",
        age: ["adult"],
        },

    "21": {
        name: "紅蘑菇不掉屑貓抓板",
        price: 225,
        desc: `
• 可愛蘑菇造型增加萌趣感 <br>
• 天然麻繩手工纏繞工藝精緻<br>
• 耐磨耐抓讓磨爪更快樂
        `,
        img: "../img/commodity-photo/twone.jpg",
        suitKitten: 1,
        suitAdult: 5,
        suitSenior: 3,
        fullDetail: "材質：麻繩 密度板",
        age: ["adult"]
}
};