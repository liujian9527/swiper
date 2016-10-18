
/*init 说明:初始化插件,初始化dom结构、布局、分页及绑定事件*/
/*initEvent 说明：初始化插件事件*/
/*pagesCount 说明：获取滑动页面数量*/
/*switchLength 说明：获取滑动宽度（横屏滑动）或高度（竖屏滑动）,改变窗口的大小*/
/*next */
/*prev */
/*_initLayout 说明：主要针对横屏情况进行页面布局*/
/*_initPaging 说明：实现分页的dom结果及css样式*/
function PageSwitch(element,opts){
	this.$el=element;
	this.opts=$.extend(true,PageSwitch.default,opts||{});
	this.init();
};
PageSwitch.prototype={
	init:function(){
		console.log(this.opts);
		var _this=this;
		this.selectors=this.opts.selectors;
		this.sections=this.$el.find(this.selectors.sections);
		this.section=this.sections.find(this.selectors.section);
		this.pagesCount=this.pagesCount();		//个数
		
		//_this.direction
		this.index=(this.opts.index >=0 && this.opts.index < this.pagesCount) ? this.opts.index : 0;
		this.pagination=this.opts.pagination;
		if(this.pagination){
			this._initPaging();
		};
		
	},
	
	initEvent:function(){},
	pagesCount:function(){
		return this.section.length
	},
	switchLength:function(){},
	next:function(){},
	prev:function(){},
	_initLayout:function(){},
	_initPaging:function(){
		
		var pagesClass=this.selectors.page.substring(1);
		var activeClass=this.selectors.active.substring(1);
		this.direction=this.opts.direction;
		console.log(pagesClass);
		
		var pageHtml='<ul class='+pagesClass+'>';	
			for(var i=0 ;i<this.pagesCount; i++){
				pageHtml+='<li></li>';
			};
			pageHtml+='</ul>';
		this.$el.append(pageHtml);
		
		var pages=this.$el.find(this.selectors.page);
		this.pageItem=pages.find('li');
		this.pageItem.eq(this.index).addClass(activeClass);
		if(this.direction){
			pages.addClass("vertical")
		}else{
			pages.addClass('horizontal')
		}
		
	},
};

PageSwitch.default={
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