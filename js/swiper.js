
/*init 说明:初始化插件,初始化dom结构、布局、分页及绑定事件*/
/*initEvent 说明：初始化插件事件*/
/*pagesCount 说明：获取滑动页面数量*/
/*switchLength 说明：获取滑动宽度（横屏滑动）或高度（竖屏滑动）,改变窗口的大小*/
/*next */
/*prev */
/*_initLayout 说明：主要针对横屏情况进行页面布局*/
/*_initPaging 说明：实现分页的dom结果及css样式*/


/*
 1.获取元素
 2.生成分页
 	1.index值获取
 	2.是否支持分页
 	3.生成分页dom
 	4.当前索引加active
 	5.根据横竖屏 给page加类名
 3.事件
 	分页点击事件
 	鼠标滚动事件
 	键盘事件
 * */

	



(function($){
	var _prefix = (function(temp){
		var aPrefix = ["webkit", "Moz", "o", "ms"],
			props = "";
		for(var i in aPrefix){
			props = aPrefix[i] + "Transition";
			if(temp.style[ props ] !== undefined){
				return "-"+aPrefix[i].toLowerCase()+"-";
			}
		}
		return false;
	})(document.createElement(PageSwitch));
	
	var PageSwitch=(function(){
		function PageSwitch(element,opts){
			this.$el=element;
			this.opts=$.extend(true,$.fn.PageSwitch.default,opts||{});
			this.init();	
		}
		PageSwitch.prototype={
	    	init:function(){
	    		var _this=this;
				this.selectors=this.opts.selectors;
				this.sections=this.$el.find(_this.selectors.sections);
				this.section=this.sections.find(_this.selectors.section);
				this.pagesCount=this.pagesCount();		//个数
				this.canScroll=true;
				console.log(this.selectors);
				/*说明：实现分页的dom结果及css样式*/
				this.index=(this.opts.index >=0 && this.opts.index < this.pagesCount) ? this.opts.index : 0;
				this.pagination=this.opts.pagination;
				if(this.pagination){
					this._initPaging();
				};
				/*说明：主要针对横屏情况进行页面布局*/
				this.direction=this.opts.direction == "vertical" ? true : false;
				if(!this.direction){
					this._initLayout();
				}
				
				this.initEvent();	
			},
			/*说明：初始化插件事件*/
			initEvent:function(){
				var _this=this
				this.$el.on('click',this.selectors.page+' li',function(){
					_this.index=$(this).index();
					_this._scrollPage();
				})
				this.$el.on('mousewheel DOMMouseScroll',function(e){
					var delta=e.originalEvent.wheelDelta || -e.originalEvent.detail;
					if(_this.canScroll){
						if(delta>0 &&(_this.index&&!_this.opts.loop||_this.opts.loop)){
							_this.prev();
						}else if(delta<0 &&(_this.index<(_this.pagesCount-1)&&!_this.opts.loop||_this.opts.loop)){
							_this.next();
						}	
					}
				})
				if(this.opts.keyboard){
					$(window).on('keydown',function(e){
						var keyCode=e.keyCode;
						console.log(keyCode)
						if(keyCode==37||keyCode==38)
						{
							_this.prev();
						}else if(keyCode==39||keyCode==40){
							_this.next();
						}
					})
				}
				$(window).resize(function(){
					var currentLength=_this.switchLength(),
						offset=_this.opts.direction ? _this.section.eq(_this.index).offset().top:_this.section.eq(_this.index).offset().left;
					    console.log(currentLength)
					    console.log(offset)
					    if(Math.abs(offset)>currentLength/2 && _this.index<(_this.pagesCount -1)){
					    	_this.index++;	
					    };
					    if(_this.index){
					    	_this._scrollPage();
					    };
				})
				this.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(){
					_this.canScroll=true;
					if(_this.opts.callback&&$.type(_this.opts.callback) =='function'){
						_this.opts.callback();
					};
				});
				/*移动*/
				$(document).on('touchmove',function(e){
					e.preventDefault();
				})
				
				this.iScroll=0;		 //移动后的位置
				this.iStart=0;		 //触摸初始位置
				this.iStartScroll=0; //滑动初始位置
				
				this.sections.on('touchstart',function(e){
					_this.fnStart(e);
				});
				this.sections.on('touchmove',function(e){
					_this.fnMove(e);
				});
				this.sections.on('touchend',function(e){
					_this.fnEnd(e)
				});
			},
			fnStart:function(e){
//				var me=this;
//				me.iStartScroll=e.originalEvent.changedTouches[0].pageX;
//				me.iStart=me.iScroll;
				var me=this;
				var Page=this.direction?e.originalEvent.changedTouches[0].pageY:e.originalEvent.changedTouches[0].pageX;
				me.iStartScroll=Page;
				me.iStart=me.iScroll;
			},
			fnMove:function(e){
//				var me=this;
//				var iDis=e.originalEvent.changedTouches[0].pageX-me.iStartScroll;
//				me.iScroll=me.iStart+iDis;
//				var translate='translateX('+me.iScroll+'px)';
//				me.sections.css('transform',translate);
     			var me=this;
     			var Page=this.direction?e.originalEvent.changedTouches[0].pageY:e.originalEvent.changedTouches[0].pageX;
				var iDis=Page-me.iStartScroll;
				me.iScroll=me.iStart+iDis;
				var translate=this.direction?'translateY('+me.iScroll+'px)':'translateX('+me.iScroll+'px)';
				me.sections.css('transform',translate);				
			},
			fnEnd:function(e){
//				var me=this;
//				var iDis=e.originalEvent.changedTouches[0].pageX-me.iStartScroll;
//				var iNub=Math.round(iDis/$(window).width());
//			    me.index-=iNub;
//			    console.log(me.index)
//				if(me.index<0){
//					me.index=0;
//				}else if(me.index>=me.pagesCount){
//					me.index=me.pagesCount-1;
//				}
//				me.iScroll=-me.index*$(window).width();
//				var translate='translateX('+me.iScroll+'px)';
//				me.sections.css('transform',translate);
//				me.pageItem.eq(me.index).addClass('active').siblings().removeClass('active')

				var me=this;
				var Page=this.direction?e.originalEvent.changedTouches[0].pageY:e.originalEvent.changedTouches[0].pageX;
				var iDis=Page-me.iStartScroll;
				var iNub=this.direction?Math.round(iDis/$(window).height()) :Math.round(iDis/$(window).width());
			    me.index-=iNub;
			    console.log(me.index)
				if(me.index<0){
					me.index=0;
				}else if(me.index>=me.pagesCount){
					me.index=me.pagesCount-1;
				}
				me.iScroll=this.direction?-me.index*$(window).height() : -me.index*$(window).width();
				var translate=this.direction?'translateY('+me.iScroll+'px)':'translateX('+me.iScroll+'px)';
				me.sections.css('transform',translate);
				me.pageItem.eq(me.index).addClass('active').siblings().removeClass('active')
				
			},
			/*说明：获取滑动页面数量*/
			pagesCount:function(){
				return this.section.length;
			},
			/*说明：获取滑动宽度（横屏滑动）或高度（竖屏滑动）,改变窗口的大小*/
			switchLength:function(){
				return this.direction?this.$el.height():this.$el.width();
			},
			prev:function(){
				if(this.index>0){
					this.index--;
				}else if(this.opts.loop){
					this.index=this.pagesCount-1;
				}
				this._scrollPage();
			},
			next:function(){
				if(this.index<this.pagesCount-1){
					this.index++;
				}else if(this.opts.loop){
					this.index=0;
				}
				this._scrollPage();	
			},
			/*说明：主要针对横屏情况进行页面布局*/
			_initLayout:function(){
				var width=(this.pagesCount*100)+'%',
					cellWidth=(100/ this.pagesCount)+'%';
				this.sections.width(width)
				this.section.width(cellWidth).css('float','left')
			},
			/*说明：实现分页的dom结果及css样式*/
			_initPaging:function(){
				
				var pagesClass=this.selectors.page.substring(1);
				
				this.activeClass=this.selectors.active.substring(1);
				this.direction=this.opts.direction;
				
				var pageHtml='<ul class='+pagesClass+'>';	
					for(var i=0 ;i<this.pagesCount; i++){
						pageHtml+='<li></li>';
					};
					pageHtml+='</ul>';
				this.$el.append(pageHtml);
				
				var pages=this.$el.find(this.selectors.page);
				this.pageItem=pages.find('li');
				this.pageItem.eq(this.index).addClass(this.activeClass);
				if(this.direction){
					pages.addClass("vertical")
				}else{
					pages.addClass('horizontal')
				}
				
			},
			_scrollPage:function(){
				var _this=this;
				var dest=this.section.eq(this.index).position();
				this.section.eq(this.index).addClass('active').siblings().removeClass('active')
				if(!dest) return;
				//点
				
				this.canScroll=false;
				if(_prefix){
					this.sections.css(_prefix+"transition","all "+_this.opts.duration+"ms "+_this.opts.easing);
					var translate= this.opts.direction?"translateY(-"+dest.top+"px)":"translateX(-"+dest.left+"px)";
					this.sections.css(_prefix+"transform",translate);
					
				}else{
					var animateCss=this.direction ? {top: -dest.top} : {left: -dest.left};
					this.sections.stop().animate( animateCss, this.opts.duration, function(){
						_this.canScroll=true;
						if(_this.opts.callback&&$.type(_this.opts.callback)=='function'){
							_this.opts.callback();
						}
					});
				};
				
				if(this.opts.pagination){
					this.pageItem.eq(this.index).addClass(this.activeClass).siblings('li').removeClass(this.activeClass);
				};	
			}
	    }
		
		return PageSwitch;
	})();
	$.fn.PageSwitch=function(opts){
		return this.each(function(){
			var _this=$(this),
				instance=_this.data('PageSwitch');
			if(!instance){
				instance=new PageSwitch(_this, opts);
				_this.data('PageSwitch',instance);
			};
			if($.type(opts)=='string'){
				console.log(instance[opts])
				return instance[opts]();
			};
		})
		
	};
	$.fn.PageSwitch.default={
		selectors:{
			sections:'.sections',
			section:'.section',
			page:'.pages',
			active:".active"
		},
		index:0,
		easing:'ease',
		duration:500,	
		loop:false,
		pagination:true,
		keyboard:true,
		direction:'vertical',/*hreizontal*/
		callback:''
	};
})(jQuery)
