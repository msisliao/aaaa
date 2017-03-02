/**
 * Created by eve on 2016/12/25.
 */
/*抖动的函数 attr-方向 left top...*/
function shake(obj,attr,endFn){ //抖动的函数  attr是方向
    var pos = parseInt(getStyle(obj,attr)); //这句是有隐患的
    var arr = [];
    var num = 0;
    for(var i=20;i>0;i-=2){ //左右抖动  开始时0  20 -20 18 -18  最后到0
        arr.push(i,-i)
    }
    arr.push(0)

    clearInterval(obj.timer)
    obj.timer = setInterval(function(){
        obj.style[attr] = pos + arr[num] + "px";
        num++;
        if(num == arr.length){
            clearInterval(obj.timer)
            endFn && endFn(); //添加回调函数
        }
    },20)

}
/*运动的函数  attr ->top left..方向  dir速度 控制的方向 正负就是相反的方向 +-20 target--到达的目标*/
function doMove(ele, attr, dir, target, endFn){ //attr属性值left/top/buttom dir正负值相反方向  target目标
    dir = parseInt(getStyle(ele, attr)) < target ? dir : -dir; //目标值大于当前是正的 小于时是负的
    clearInterval(ele.timer)
    ele.timer = setInterval(function(){
        var speed = parseInt(getStyle(ele, attr)) + dir; //每隔30秒left的偏移
        if(speed > target && dir > 0 || speed < target && dir < 0){
            //正数时往前跑  负数时往回跑  所以可以利用dir进一步判断
            speed = target
        }
        ele.style[attr] = speed + "px";
        if(speed == target){
            clearInterval(ele.timer)
            //有回调函数时执行
            endFn && endFn();
        }
    }, 30)
}

/*设置透明度的运动---begin开始的是0 还是100  target-目标0或100*/
function opac(ele,begin,target,sped,endFn){ //sped速度 数字大变化快
    ele.timer = setInterval(function(){
        target == 0 ? begin-- : begin++; //目标元素是0的话就透明度要减 如果目标元是100的话 透明度就要加
        if(begin == target){
            clearInterval(ele.timer)
            endFn && endFn()
        }
        ele.style.opacity = begin/100;  //num 10 20 30 40 50
        ele.style.filter='alpha(opacity='+begin+')'  //num 10 20 30 40 50
    },sped)
}

function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] :getComputedStyle(obj)[attr];
}
