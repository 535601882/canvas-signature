/**
 * 在 canvas 中制作签名的想法和实现
 * 
 * 思路：
 * 监听鼠标事件：当鼠标在画布上移动并按下鼠标按钮时，
 * 我们应该从上一个点到当前点画下一条线
 * 
 */

window.onload = function(){
  // 创建canvas
  var canvasDom = document.createElement("canvas")
  canvasDom.setAttribute("id","canvas")
  canvasDom.setAttribute("style","margin-left:30px")
  var _body = document.body
  _body.append(canvasDom)

  var clearDom = document.createElement("button")
  clearDom.textContent = "清除"
  clearDom.setAttribute("id","clear")
  _body.append(clearDom)

  var picDom = document.createElement("button")
  picDom.textContent = "获取图片"
  picDom.setAttribute("id","getpic")
  _body.append(picDom)

  //==========================
  var canvas = document.getElementById("canvas"),
      clear = document.getElementById("clear"),
      getpic = document.getElementById("getpic"),
      context = canvas.getContext("2d"),
      mouseIsPressed = false,
      currX,
      currY,
      prevX,
      prevY,
      borderWidth = 1,
      width = 300,
      height = 200,
      lineWidth = 3;

  canvas.style.border = borderWidth + "px solid #000";
  canvas.width = width;
  canvas.height = height;

  // 兼容移动端跟PC端
  if(mobileAndTabletCheck()){
    canvas.addEventListener("touchmove", draw,false);
    canvas.addEventListener("touchstart", start,false);
    canvas.addEventListener("touchend", stop,false);
  } else {
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mousedown", start);
  }
  clear.addEventListener("click", handleClear);
  getpic.addEventListener("click", handleGetPic);

  // 画线
  function drawLine(x1,y1,x2,y2){
    context.beginPath()// 创建路径
    context.moveTo(x1, y1); //移动到
    context.lineTo(x2, y2); //画一条线
    // context.moveTo(x1 - borderWidth, y1 - borderWidth); //减去边框
    // context.lineTo(x2 - borderWidth, y2 - borderWidth); 
    context.lineWidth = lineWidth;
    context.stroke()// 填充
    context.closePath()// 关闭
  }
  // 鼠标按下
  function start(e){
    e.preventDefault();
    mouseIsPressed = true// 保存鼠标被按下

    var clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    var clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    currX = clientX - canvas.offsetLeft;
    currY = clientY - canvas.offsetTop;

    drawLine(currX,currY,currX+lineWidth,currY+lineWidth)// 画一个像点一样的短线
  }
  // 鼠标抬起
  function stop(e){
    mouseIsPressed = false// 记录鼠标被释放
    prevX = prevY = null;
  }

  // 鼠标移动
  function draw(e){
    // 在PC端获取当前鼠标的坐标是：event.clientX和event.clientY，在移动端获取坐标位置则是：event.touches[0].clientX和event.touches[0].clientY。
    var clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    var clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    currX = clientX - canvas.offsetLeft;
    currY = clientY - canvas.offsetTop;
    // 默认初始值
    if (!prevX && !prevY) {
      prevX = currX;
      prevY = currY;
    }
    
    // 检查鼠标是否按下,如果被按下，则从先前坐标到当前坐标绘制一条线
    if (mouseIsPressed) {
      drawLine(prevX,prevY,currX,currY)
    }
    // 将当前坐标重置为先前坐标
    prevX = currX;
    prevY = currY;
  }

  // 清除画布
  function handleClear(){
    context.clearRect(0,0,width,height)
  }
  // 获取canvas 图像并上传到后端
  function handleGetPic(){
    removeImg()
    var url = canvas.toDataURL()
    var img = new Image()
    img.src = url
    img.onload = function(){
      _body.append(img)
    }
    // canvas转为blob对象,上传文件
    canvas.toBlob(function (blobObj) {
      console.log(blobObj)
    })
  }
  // 清除页面上已经插入存在的图像
  function removeImg(){
    Array.prototype.forEach.call(document.getElementsByTagName("img"), function(ele, index) {
        ele.remove()
    })
  }


}
// 检测浏览类型
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};