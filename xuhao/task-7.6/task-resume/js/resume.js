var normalWidth = window.innerWidth;
var normalHeight = window.innerHeight;
var dom = document.getElementById('1')

var throttle = function(fn, interval) {
    var _self = fn,
        timer,
        fisrtTime = true;


    return function() {
        var args = arguments,
            _this = this;

        if (fisrtTime) {
            _self.apply(_this, args);
            return fisrtTime = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            _self.apply(_this.args);
        }, interval || 200);
    }
}

window.onresize = throttle(function() {
    if (normalWidth > window.innerWidth || normalHeight > normalHeight.innerHeight) {
        dom.style.transform = 'rotate(' + 0 + 'deg)';
    } else {
        dom.style.transform = 'rotate(' + (-15) + 'deg)';
    }
}, 250)