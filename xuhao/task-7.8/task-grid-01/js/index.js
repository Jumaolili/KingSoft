// const fs = require('fs');
// var obj = null;

// fs.readFile('../data/task.json', 'utf-8', (err, data) => {
//     if (err) {
//         throw new Error(err);
//     } else {
//         obj = JSON.parse(data.toString())
//         changeDom(obj);
//     }
// })

var arr = [{
        "title": "向宿命挥拳的人 (《新斗罗大陆》手游戴沐白角色曲)",
        "singer": "阿云嘎",
        "listen_num": 9370,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M102000SY7kU0vIuoT.jpg"
    },
    {
        "title": "雨",
        "singer": "Sunnee杨芸晴",
        "listen_num": 3585,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M000003vHDbe24Jqpl.jpg"
    },
    {
        "title": "一爱如故 (《长歌行》电视剧插曲)",
        "singer": "摩登兄弟刘宇宁",
        "listen_num": 43495,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M1010047OlaH3P3f0J.jpg"
    },
    {
        "title": "我很好骗",
        "singer": "动力火车",
        "listen_num": 11301,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M101002cYg662xvSlL.jpg"
    },
    {
        "title": "造梦时学会飞行 (《声梦传奇》主题曲)",
        "singer": "TVB",
        "listen_num": 1539,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M101001YVtJL2sr2Z7.jpg"
    },
    {
        "title": "What's Wrong With Me (Punk Version)",
        "singer": "Lil Ghost小鬼",
        "listen_num": 206872,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M101003RlAau1dFne3.jpg"
    },
    {
        "title": "Let's Party (《和平精英》2周年庆派对邀请曲)",
        "singer": "吴宣仪",
        "listen_num": 67024,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M102003c3tSe1ehWwN.jpg"
    },
    {
        "title": "鋼の羽根",
        "singer": "RADWIMPS",
        "listen_num": 2927,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M0000013X2t31kvJC4.jpg"
    },
    {
        "title": "에필로그 (epilogue)",
        "singer": "IU",
        "listen_num": 8197,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M101003aYDEH2kWTX7.jpg"
    },
    {
        "title": "圭贤《Coffee》MV",
        "singer": "圭贤",
        "listen_num": 15163,
        "cover": "https://y.gtimg.cn/music/photo_new/T015R640x360M101000xHMCS1g3sSW.jpg"
    }
]

function changeDom(arr) {
    var mvList = arr,
        imgs = document.querySelectorAll('.bottom-avatar'),
        titles = document.querySelectorAll('.text-3-title'),
        names = document.querySelectorAll('.text-3-name'),
        indexs = document.querySelectorAll('.text-3-index-num');
    for (let i = 0, img; img = imgs[i]; i++) {
        img.src = mvList[i].cover;
    }
    for (let i = 0, title; title = titles[i]; i++) {
        title.innerText = mvList[i].title;
    }
    for (let i = 0, name; name = names[i]; i++) {
        name.innerText = mvList[i].singer;
    }
    for (let i = 0, index; index = indexs[i]; i++) {
        index.innerText = mvList[i].listen_num;
    }
}

changeDom(arr)