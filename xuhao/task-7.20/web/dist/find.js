var openBtn = document.querySelector('#open'), key = document.querySelector('#putKey');
openBtn.addEventListener('click', function () {
    var id = key.value.trim();
    if (id === '') {
        return alert('你还没有输入key');
    }
    // if(!localStorage.getItem(id)){
    //     return alert('你输入了错误的key')
    // }
    // let data=JSON.parse(localStorage.getItem(id));
    // let now=new Date().getTime();
    // if(data.time>now){
    //     alert(`还没到时间，距离开启还有${(data.time-now)/1000}秒,还有，你想对自己说：${data.tip===''?'你没有写tip~~':data.tip}`)
    // }else{
    //     alert(`
    //         打开了！
    //         你的名字是：${data.name}
    //         你的邮箱是：${data.email}
    //         当时你想打开的时间是：${new Date(data.time)}
    //         你写了这样的话给自己:${data.content}
    //         如果你想提前打开，你留下了这样的话给你：${data.tip}
    //         胶囊的key是：${data.id}
    //     `)
    // }
    //修改的部分
    var form = {
        id: id
    };
    fetch('http://127.0.0.1:3280/api/get', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(function (res) {
        return res.json();
    })
        .then(function (response) {
        if (!response.time) {
            return alert('key输入错误');
        }
        if (new Date().getTime() < parseInt(response.time)) {
            alert('还没到时间呢！');
        }
        else {
            var date = new Date(response.time).toUTCString();
            var now = new Date().getTime();
            var item = document.createElement('div'), p_title = document.createElement('p'), p_content = document.createElement('p'), div = document.querySelector('.opened-content');
            p_title.innerHTML = response.name + " \u5728 " + date + "\u60F3\u5BF9\u4F60\u8BF4";
            p_title.className = 'item-title';
            p_content.innerHTML = "" + response.content;
            p_content.className = 'item-content';
            item.className = 'item';
            item.appendChild(p_title);
            item.appendChild(p_content);
            div.appendChild(item);
            // alert(
            //     `
            //         name: ${response.name}
            //         content:${response.content}
            //         time:${response.time}
            //         tip:${response.tip}
            //         email:${response.email}
            //     `
            // )
        }
    })
        .catch(function (error) { return console.error('Error:', error); });
});
//# sourceMappingURL=find.js.map