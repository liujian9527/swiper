//document.ontouchmove=function(e)
//{
//	e.preventDefault();
//};
//window.onload=function()
//{
//	var oList=document.getElementById("picList");
//	var aBtns=document.getElementById("picBtns").children;
//	var iScroll=0;		 //移动后的位置
//	var iStartX=0;		//触摸初始位置
//	var iStartScroll=0;//滑动初始位置
//	var iNow=0;
//	
//	oList.addEventListener('touchstart',fnStart,false);
//	oList.addEventListener('touchmove',fnMove,false);
//	oList.addEventListener('touchend',fnEnd,false);
//	function fnStart(ev)
//	{
//		iStartScroll=ev.changedTouches[0].pageX;
//		iStartX=iScroll;
//		oList.style.WebkitTransition=oList.style.MozTransition=oList.style.transition="none";
//	};
//	function fnMove(ev)
//	{
//		var iDis=ev.changedTouches[0].pageX-iStartScroll;
//		iScroll=iStartX+iDis;
//		setStyle();
//	};
//	function fnEnd(ev)
//	{
//		var iDis=ev.changedTouches[0].pageX-iStartScroll;
//		var iNub=Math.round(iDis/window.screen.width);
//		iNow-=iNub;
//		if(iNow<0)
//		{
//			iNow=0;
//		}
//		if(iNow>=aBtns.length)
//		{
//			iNow=aBtns.length-1;
//		}
//		iScroll=-iNow*window.screen.width;
//		oList.style.WebkitTransition=oList.style.MozTransition=oList.style.transition=".5s";
//		for(var i=0;i<aBtns.length;i++)
//		{
//			aBtns[i].className="";
//		}
//		aBtns[iNow].className="active";
//		setStyle();
//	};
//	function setStyle()
//	{
//		oList.style.WebkitTransform=oList.style.MozTransform=oList.style.transform="translateX("+iScroll+"px)";
//	}
//};

//(function($){
//	var Demo=(function(){
//		function Demo(el, opts){
//
//			this.el=el;
//			this.opts=$.extend(true, $.fn.Demo.default, opts||{});
//			this.init();
//			
//			this.iStartX=0;  //初始触摸距离
//			this.iScroll=0;		//移动后
//			this.iStartScroll=0;
//			this.iNow=0
//		}
//		Demo.prototype.init=function(){
//			var me=this;
//			me.el.on('touchstart',function(e){
//				me.fnStart(e)
//			});
//			me.el.on('touchmove',function(e){
//				me.fnMove(e)
//			})
//			me.el.on('touchend',function(e){
//				me.fnEnd(e)
//			})
//		};
//
////	function fnStart(ev)
////	{
////		iStartScroll=ev.changedTouches[0].pageX;
////		iStartX=iScroll;
////		oList.style.WebkitTransition=oList.style.MozTransition=oList.style.transition="none";
////	};
//		Demo.prototype.fnStart=function(e){
//			var me=this;
//			this.iStartScroll=e.originalEvent.changedTouches[0].pageX;
//			//console.log(this.iStartScroll);
//			this.iStartX=this.iScroll;
//		};
////	function fnMove(ev)
////	{
////		var iDis=ev.changedTouches[0].pageX-iStartScroll;
////		iScroll=iStartX+iDis;
////		setStyle();
////	};
//		Demo.prototype.fnMove=function(e){
//
//			var me=this;
//			var Touches=e.originalEvent.changedTouches[0];
//		
//			var iDis=Touches.pageX-this.iStartScroll;
//			this.iScroll=this.iStartX+iDis;
//			var translate='translateX('+this.iScroll+'px)'
//			this.el.css('transform',translate)
//			
//			
//			
//			console.log('起始位：'+this.iStartScroll+'，结束：'+Touches.pageX+'，移动'+this.iScroll+'，'+this.iStartX);
//		};
////	function fnEnd(ev)
////	{
////		var iDis=ev.changedTouches[0].pageX-iStartScroll;
////		var iNub=Math.round(iDis/window.screen.width);
////		iNow-=iNub;
////		if(iNow<0)
////		{
////			iNow=0;
////		}
////		if(iNow>=aBtns.length)
////		{
////			iNow=aBtns.length-1;
////		}
////		iScroll=-iNow*window.screen.width;
////		oList.style.WebkitTransition=oList.style.MozTransition=oList.style.transition=".5s";
////		for(var i=0;i<aBtns.length;i++)
////		{
////			aBtns[i].className="";
////		}
////		aBtns[iNow].className="active";
////		setStyle();
////	};
//		Demo.prototype.fnEnd=function(e){
//			var me=this;
//			var Touches=e.originalEvent.changedTouches[0];
//			
//			var iDis=Touches.pageX-this.iStartScroll;
//		    var iNub=Math.round(iDis/$(window).width());
//		    var picBtns=$(this.opts.picBtns);
//		    var Length=picBtns.find('span').length
//
//		    this.iNow-=iNub;
//		    if(this.iNow<0)
//			{
//				this.iNow=0;
//			}
//			if(this.iNow>=Length)
//			{
//				this.iNow=Length-1;
//			}
//		    
//		    this.iScroll=-this.iNow*$(window).width();
//		   
//		    var translate='translateX('+this.iScroll+'px)'
//		    console.log(translate)
//			this.el.css('transform',translate)
//		};
//		return Demo;
//	})()
//	
//	$.fn.Demo=function(opts){
//		return this.each(function(){
//			var me=$(this),
//				Data=me.data('Demo');
//			if (!Data) {
//				Data=new Demo(me ,opts);
//				me.data('Demo',Data)
//			}
//			if ($.type(opts)==='string') {
//				return Data[opts]();
//			}
//		})
//	}
//	$.fn.Demo.default={
//		picList:'#picList',
//		picBtns:'#picBtns'
//	};
//})(jQuery);



(function($){
	var Demo=(function(){
		function Demo(el,opts){
			this.el=el;
			this.opts=$.extend(true, $.fn.Demo.default, opts||{});
			this.init();
			this.iStartScroll=0;
			this.iStartX=0;
			this.iScroll=0;
			this.iNow=0;
		}
		Demo.prototype={
			init:function(){
				var me=this;
				$(document).on('mousemove',function(e){
					e.preventDefault();
				})
				me.el.on('touchstart',function(e){
					me.fnstart(e)
				});
				me.el.on('touchmove',function(e){
					me.fnmove(e)
				})
				me.el.on('touchend',function(e){
					me.fnend(e)
				})
			},
			fnstart:function(e){
				var me=this;
				me.iStartScroll=e.originalEvent.changedTouches[0].pageX;
				me.iStartX=me.iScroll;
			},
			fnmove:function(e){
				var me=this;
				var iDis=e.originalEvent.changedTouches[0].pageX-me.iStartScroll;
				me.iScroll=me.iStartX+iDis;
				var translate='translateX('+me.iScroll+'px)';
				me.el.css('transform',translate);
			},
			fnend:function(e){
				var me=this;
				var iDis=e.originalEvent.changedTouches[0].pageX-me.iStartScroll;
				var iNub=Math.round(iDis/$(window).width());
				var picBtns=$(me.opts.picBtns);
			    var Length=picBtns.find('span').length;
			    me.iNow-=iNub;
			    
				if(me.iNow<0){
					me.iNow=0;
				}else if(me.iNow>=Length){
					me.iNow=Length-1;
				}
				me.iScroll=-me.iNow*$(window).width();
				var translate='translateX('+me.iScroll+'px)';
				me.el.css('transform',translate);
				picBtns.find('span').eq(me.iNow).addClass('active').siblings().removeClass('active');
			}
			
		}
		
		return Demo;
	})()
	
	$.fn.Demo=function(opts){
		return this.each(function(){
			var me=$(this),
				Data=me.data('Demo');
				if (!Data) {
					Data=new Demo(me,opts);
					me.data('Demo',Data);
				}
				if ($.type(opts)==='string') {
					return Data[opts]();
				}
		})
	}
	$.fn.Demo.default={
		picList:'#picList',
		picBtns:'#picBtns'
	}
})(jQuery)
