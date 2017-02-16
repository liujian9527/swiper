/*
	 * 静态
	 * 类级别组件开发
	 * 给jq命名空间下添加新的全局函数
	 * $.obj=function(){}
	 * $.ajax()、$.extend()
	 * 
	 * 动态
	 * 对象级别组件开发
	 * 挂在就去原型下的方法，通过选择器获取的jq对象实例也能共享该方法
	 * $.fn.obj=function(){}
	 * $.fn===$.prototype 
	 * .animate()
	 * 
	 * 链式调用
	 * $.fn.obj=function(){
	 * 	 return this.each(function(){})
	 * }
	 * return this 返回当前对象，维护插件的链式调用
	 * each 循环实现每个元素的访问
	 */
	/* 单例模式
	$.fn.MyPlugin=function(){
		var me=$(this),
			instance=me.data('MyPlugin');
		if (!instance) {
			me.data('myPlugin',(instance=new myPlugin()))
		}
	}
*/

/*(function($){
	console.log("自执行");
	
	var PageSwitch=(function(){
		
		function PageSwitch(element,opts){
			this.init()
		};
		PageSwitch.prototype={
			init:function(){},
			initEvent:function(){},
			pagesCount:function(){},
			switchLength:function(){},
			next:function(){},
			prev:function(){},
			_initLayout:function(){},
			_initPaging:function(){},
		};
		
	})();
	
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
		direction:'vertical',
		callback:''
	}
	
})(jQuery)
*/
