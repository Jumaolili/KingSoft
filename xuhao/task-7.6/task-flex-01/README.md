实现思路很简单

整体container分为 top bottom 两大块

container设置 100%高度 和 overflow：hidden， 以及flex 布局 垂直方向

top 固定高度  内部 分为 3 部分， 其中第二部分内部使用flex 布局 ， 再配合相对定位
bottom 设置flex：1 使其占据剩余空间高度

整体 在有div的地方 尽量都是用百分比，时页面能够适配不同的窗口
