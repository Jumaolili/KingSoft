###### Task1 构思

页面总体分为三个部分：header、main和footer。

宽度均为1200px，margin居中

main部分分为三个部分：item-1，item-2，item-3，

其中item-1和item-3的布局基本一致，除了文本和img高度，所以item-3的CSS复用了item-1的CSS，再做细微调整。

item-1的CSS，整体采用Grid布局，repeat（5，1fr）



item-2的CSS和item-1的CSS 思路一致，只不过每个div内容横向了。



不知道要不要添加demo中的过渡，

###### demo里面有两个点：

1. img图片局部放大效果思路，img外层div使用overflow:hidden,而img采用CSS变形和过渡，这样一来，img放大了，超过div的部分就被隐藏起来，效果就是局部放大，大小不变。

2.  父元素

   ​	子元素1

   ​	子元素2

   ​	子元素3

   这种情况可以利用 父元素的伪类 和 关系选择器来操控子元素CSS

   如图;

   ```css
   .item-top {
       /* content */
       height: 228px;
       width: 228px;
       overflow: hidden;
   }
   
   
   /* item-top 控制 图片 按钮 */
   
   .item-top:hover>.item-mask {
       /* content */
       background-color: black;
       opacity: 0.25;
   }
   
   .item-top:hover>.mask-img {
       /* content */
       opacity: 1;
       transform: scale(1.3);
   }
   
   .item-top:hover>.item-img {
       /* content */
       /* aniamtion */
       transform: scale(1.07);
   }
   ```

   



