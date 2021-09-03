const data = [{
        "cover": "imgs/cover-01.jpg",
        "avatar": "imgs/avatar-01.jpg",
        "name": "Steve Wolf",
        "badge": "Pro",
        "likes": "225",
        "views": "32.6k"
    },
    {
        "cover": "imgs/cover-02.png",
        "avatar": "imgs/avatar-02.png",
        "name": "Fireart Studio",
        "badge": "Team",
        "likes": "137",
        "views": "19.9k"
    },
    {
        "cover": "imgs/cover-03.jpg",
        "avatar": "imgs/avatar-03.jpg",
        "name": "Ethan Fender",
        "badge": "Pro",
        "likes": "152",
        "views": "25.9k"
    },
    {
        "cover": "imgs/cover-04.png",
        "avatar": "imgs/avatar-04.gif",
        "name": "Stevan Rodic",
        "badge": "Pro",
        "likes": "96",
        "views": "16.9k"
    },
    {
        "cover": "imgs/cover-05.png",
        "avatar": "imgs/avatar-05.png",
        "name": "Dribbble",
        "badge": "Team",
        "likes": "43",
        "views": "3.5k"
    },
    {
        "cover": "imgs/cover-06.png",
        "avatar": "imgs/avatar-06.jpg",
        "name": "Alfrey Davilla | vaneltia",
        "badge": "Pro",
        "likes": "74",
        "views": "7.4k"
    },
    {
        "cover": "imgs/cover-07.png",
        "avatar": "imgs/avatar-07.png",
        "name": "tubik",
        "badge": "Team",
        "likes": "124",
        "views": "18.2k"
    },
    {
        "cover": "imgs/cover-08.jpg",
        "avatar": "imgs/avatar-08.png",
        "name": "Dlanid",
        "badge": "Pro",
        "likes": "46",
        "views": "7.1k"
    },
    {
        "cover": "imgs/cover-09.png",
        "avatar": "imgs/avatar-09.jpg",
        "name": "The Faces",
        "badge": "Team",
        "likes": "59",
        "views": "7.3k"
    },
    {
        "cover": "imgs/cover-10.png",
        "avatar": "imgs/avatar-10.png",
        "name": "Odama",
        "badge": "Team",
        "likes": "54",
        "views": "1.1k"
    },
    {
        "cover": "imgs/cover-11.jpg",
        "avatar": "imgs/avatar-11.jpg",
        "name": "Matt Naylor",
        "badge": "Team",
        "likes": "56",
        "views": "8.1k"
    },
    {
        "cover": "imgs/cover-12.png",
        "avatar": "imgs/avatar-12.jpg",
        "name": "Voila",
        "badge": "Team",
        "likes": "164",
        "views": "24.1k"
    }
]

let doms = document.querySelectorAll('.bottom-item');
for (let i = 0, item; item = doms[i]; i++) {
    item.children[0].src = data[i].cover;
    item.children[1].children[0].children[0].src = data[i].avatar;
    item.children[1].children[0].children[1].innerText = data[i].name;
    item.children[1].children[0].children[2].innerText = data[i].badge;
    item.children[1].children[1].children[1].innerText = data[i].views;
    item.children[1].children[1].children[3].innerText = data[i].likes;
}

// // 按钮点击事件
// let dom_func = document.querySelector('.header-func');

// dom_func.addEventListener('click', function() {
//     let dom = document.querySelector('.mask-content'),
//         btn = document.querySelector('.header-func');
//     if (dom.style.display === 'none') {
//         dom.style.display = 'block';
//         btn.src = './imgs/icon-close.svg';
//     } else {
//         dom.style.display = 'none';
//         btn.src = './imgs/icon-menu.svg'
//     };
// })

//button 类
let Button = function() {
    this.button = null;
    this.openBar = new OpenBar(this);
    this.closeBar = new CloseBar(this);
    this.current = this.openBar;
}
Button.prototype.init = function() {
    let dom_func = document.querySelector('.header-func');
    let _this = this;
    dom_func.addEventListener('click', function() {
        _this.current.changeBar();
    })

    this.button = dom_func;
}

//操作类
let ClickHandle = function() {};

ClickHandle.prototype.changeBar = function() {
    throw new Error('子类必须覆盖父类click事件');
}

//打开按钮
let OpenBar = function(btn) {
    this.button = btn;
};
OpenBar.prototype = new ClickHandle();
OpenBar.prototype.changeBar = function() {
    this.button.current = this.button.closeBar;
    mask.style.display = 'block';
    this.button.src = './imgs/icon-close.svg';
}

//关闭按钮
let CloseBar = function(btn) {
    this.button = btn;
};
CloseBar.prototype = new ClickHandle();
CloseBar.prototype.changeBar = function() {
    this.button.current = this.button.openBar;
    mask.style.display = 'none';
    this.button.src = './imgs/icon-menu.svg';
}

//获取mask
let mask = document.querySelector('.mask-content');

//获取页面按钮
let button = new Button();
button.init();