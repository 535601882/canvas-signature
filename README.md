# 用 HTML5 Canvas 创建数字签名板

## 思路：
我们需要监听鼠标事件：当鼠标在画布元素上移动并按下鼠标按钮时，我们应该从上一个点到当前点画一条线。


## 方案：
1. 创建绘制线条的函数(在画布上从第一个点到第二个点画一条线)。

2. 监听按下鼠标按钮，保存绘制状态并绘制一个点。

3. 监听释放鼠标按钮,并重置状态。

4. 监听鼠标移动事件，当鼠标按钮处于按下状态时，从前一个 (x,y) 到当前 (x,y) 画一条线。

## 注意区分移动端跟PC端的事件
在PC端获取当前鼠标的坐标是：event.clientX和event.clientY，在移动端获取坐标位置则是：event.touches[0].clientX和event.touches[0].clientY。

## 待优化
移动端横竖屏切换