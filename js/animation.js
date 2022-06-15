var total=40,
  container=document.getElementById('container'),
  w=window.innerWidth,
  h=window.innerHeight,
  Tweens=[],
  SPs=1;



for (var i=total;i--;){ 
  var Div=document.createElement('div');
  TweenLite.set(Div,{attr:{class:'dot'},x:R(w),y:R(h),opacity:0});
  container.appendChild(Div); Anim(Div);  Tweens.push(Div);
};

function Anim(elm){ 
  elm.Tween=TweenLite.to(elm,R(20)+10,{bezier:{values:[{x:R(w),y:R(h)},{x:R(w),y:R(h)}]},opacity:R(1),scale:R(1)+0.5,delay:R(2),onComplete:Anim,onCompleteParams:[elm]})
};

for(var i=total;i--;){
  Tweens[i].Tween.play()};

window.addEventListener("resize", resize);

function R(max){return Math.random()*max};

function resize() {
  
  w = window.innerWidth;
  h = window.innerHeight;
  
  for (var i = 0; i < total; i++) {
    
    var fireFly = Tweens[i];

    TweenLite.killTweensOf(fireFly);
    
    Anim(fireFly);
  }
}
