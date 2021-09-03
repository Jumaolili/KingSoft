var open = document.querySelector('#open'), key = document.querySelector('#putKey');
open.addEventListener('click', function () {
    var id = key.value.trim();
    if (id === '') {
        return alert('你还没有输入key');
    }
    if (!localStorage.getItem(String(id))) {
        return alert('你输入了错误的key');
    }
    var data = JSON.parse(localStorage.getItem(id));
    var date = new Date(data.time).toUTCString();
    var now = new Date().getTime();
    var item = document.createElement('div'), p_title = document.createElement('p'), p_content = document.createElement('p'), div = document.querySelector('.opened-content');
    if (data.time > now) {
        // alert(`还没到时间，距离开启还有${(data.time-now)/1000}秒,还有，你想对自己说：${data.tip===''?'你没有写tip~~':data.tip}`)
        p_title.innerHTML = data.name + " \u5728 " + date + "\u60F3\u5BF9\u4F60\u8BF4";
        p_title.className = 'item-title';
        p_content.innerHTML = "\u8FD8\u6CA1\u5230\u65F6\u95F4";
        p_content.className = 'item-content';
        item.className = 'item';
        item.appendChild(p_title);
        item.appendChild(p_content);
        div.appendChild(item);
    }
    else {
        p_title.innerHTML = data.name + " \u5728 " + date + "\u60F3\u5BF9\u4F60\u8BF4";
        p_title.className = 'item-title';
        p_content.innerHTML = "" + data.content;
        p_content.className = 'item-content';
        item.className = 'item';
        item.appendChild(p_title);
        item.appendChild(p_content);
        div.appendChild(item);
        // alert(`
        //     打开了！
        //     你的名字是：${data.name}
        //     你的邮箱是：${data.email}
        //     当时你想打开的时间是：${new Date(data.time)}
        //     你写了这样的话给自己:${data.content}
        //     如果你想提前打开，你留下了这样的话给你：${data.tip}
        //     胶囊的key是：${data.id}
        // `)
    }
});
//# sourceMappingURL=find.js.map