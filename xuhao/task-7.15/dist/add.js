var dom_name = document.querySelector('#name'), dom_email = document.querySelector('#email'), dom_time = document.querySelector('#open_time'), dom_content = document.getElementById('content'), dom_tip = document.querySelector('#tip'), alerts = document.querySelectorAll('.check'), dom_submit = document.querySelector('.submit');
var Strategies = {
    isEmail: function (value, errMsg) {
        if (!/[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/.test(value)) {
            return errMsg;
        }
    },
    isEmpty: function (value, errMsg) {
        if (value === '') {
            return errMsg;
        }
    },
    isMore: function (value, errMsg) {
        if (value.length > 5000) {
            return errMsg;
        }
    },
    isRightTime: function (value, errMsg) {
        if (value === '') {
            return errMsg;
        }
        if (typeof value.split !== 'function') {
            return errMsg;
        }
        var arr = value.split(' ');
        if (arr.length !== 2) {
            return errMsg;
        }
        if (typeof arr[0].split !== 'function' || typeof arr[1].split !== 'function') {
            return errMsg;
        }
        var YMD = arr[0].split('-').length, HMS = arr[1].split(':').length;
        if (YMD + HMS !== 6) {
            return errMsg;
        }
    }
};
var check_name = function () {
    if (Strategies.isEmpty(dom_name === null || dom_name === void 0 ? void 0 : dom_name.value.trim(), "姓名不能为空")) {
        alerts[0].innerHTML = "姓名不能为空";
        alerts[0].style.color = "red";
        return "姓名不能为空";
    }
    else {
        alerts[0].innerHTML = "Good ! !";
        alerts[0].style.color = "green";
    }
};
var check_email = function () {
    if (Strategies.isEmail(dom_email === null || dom_email === void 0 ? void 0 : dom_email.value, "邮箱格式错误") || Strategies.isEmpty(dom_email === null || dom_email === void 0 ? void 0 : dom_email.value, "邮箱不能为空")) {
        alerts[1].innerHTML = "邮箱不能为空或格式错误";
        alerts[1].style.color = "#990000";
        return "邮箱不能为空或格式错误";
    }
    else {
        alerts[1].innerHTML = "Good ! !";
        alerts[1].style.color = "green";
    }
};
var check_content = function () {
    if (Strategies.isMore(dom_content.value, '超出了字数') || Strategies.isEmpty(dom_content.value.trim(), '内容不能为空')) {
        alerts[3].innerHTML = "超出了字数或内容为空";
        alerts[3].style.color = "#990000";
        return "超出了字数或内容为空";
    }
    else {
        alerts[3].innerHTML = "Good ! !";
        alerts[3].style.color = "green";
    }
};
var check_time_empty = function () {
    if (Strategies.isEmpty(dom_time.value.trim(), "内容不为空")) {
        alerts[2].innerHTML = "时间不能为空";
        alerts[2].style.color = "#990000";
        return "时间不能为空";
    }
    else {
        alerts[2].innerHTML = "Good ! !";
        alerts[2].style.color = "green";
    }
};
var check_time_form = function () {
    if (Strategies.isRightTime(dom_time.value.trim(), '时间格式错误')) {
        alerts[2].innerHTML = "时间格式错误";
        alerts[2].style.color = "#990000";
        return "时间格式错误";
    }
    else {
        alerts[2].innerHTML = "Good ! !";
        alerts[2].style.color = "green";
    }
};
dom_name === null || dom_name === void 0 ? void 0 : dom_name.addEventListener('keyup', function () {
    check_name();
});
dom_email === null || dom_email === void 0 ? void 0 : dom_email.addEventListener('keyup', function () {
    check_email();
});
dom_content === null || dom_content === void 0 ? void 0 : dom_content.addEventListener('keyup', function () {
    check_content();
});
dom_time.addEventListener('keyup', function () {
    check_time_empty();
});
dom_time.addEventListener('blur', function () {
    check_time_form();
});
dom_submit.addEventListener('click', function () {
    var err = check_name() || check_content() || check_email() || check_time_empty() || check_time_form();
    if (err) {
        return alert(err);
    }
    ;
    var arr = dom_time.value.trim().split(' ');
    var YMD = arr[0].split('-').map(function (item) {
        return Number(item);
    }), HMS = arr[1].split(':').map(function (item) {
        return Number(item);
    });
    var dateTime = YMD.concat(HMS);
    var date = new Date(dateTime[0], dateTime[1], dateTime[2], dateTime[3], dateTime[4], dateTime[5]);
    var time = date.getTime();
    var id = Number(String(Math.random()).substr(2)).toString();
    var form = {
        id: id,
        name: dom_name.value.trim(),
        email: dom_email.value.trim(),
        time: time,
        content: dom_content.value.trim(),
        tip: dom_tip.value.trim()
    };
    localStorage.setItem(id, JSON.stringify(form));
    alert("key \u4E3A " + id);
});
console.log(localStorage.getItem("myData"));
// let Context=(function(){
//     let tasks:object[]=[];
//     return {
//         add:function (dom:any,errMsg:string,strategy:string) {
//             let value=dom.value;
//             tasks.push(Strategies[strategy](value,errMsg));
//         },
//         start:function () {
//             let errMsg=null;
//             for(let i=0;i<tasks.length;i++){
//                 let result=tasks[i]();
//                 if(typeof result === 'string'){
//                     return errMsg=result;
//                 }
//             }
//         }
//     }
// })();
// let Agent=function(){
//     Context.add(dom_name,'','isEmpty');
//     Context.add(dom_email,'','isEmpty');
//     Context.add(dom_email,'','isEmail');
//     Context.add(dom_content,'','isMore');
//     let errMsg=Context.start;
//     if(errMsg){
//         alert(errMsg);
//     }
//     //发送请求
// }
// Agent();
//# sourceMappingURL=add.js.map