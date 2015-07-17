;(function(){
	var fontAnimate=function(area){
		//保存当前对象
		var self=this;
		//组件外框
		this.area=area;
		this.setting={
			"autoPlay":true,//是否开启自动播放
			"num":"0",		//数字值
			"speed":10,	//动画速度，毫秒计
			"delay":0,	//动画延迟时间，毫秒
			"growth":10,	//每次增加幅度
			"height":"auto",		//组件高度
			"split":false,	//是否开启千分分割
			"splitSign":","	//千分分割符
		};

		$.extend(this.setting,this.getSetting());
		//过滤非数字
		this.number=(this.setting.num+'').replace(/[^0-9+\-Ee.]/g, '');
		this.setting.speed=(this.setting.speed+'').replace(/[^0-9+\-Ee.]/g, '');
		this.setting.growth=(this.setting.growth+'').replace(/[^0-9+\-Ee.]/g, '');
		//千分位分隔符,默认“,”
		this.splitSign=this.setting.splitSign;

		//执行动画
		if(this.setting.autoPlay===true){
			self.playAnimate();
		}
		else{
			this.playStatic();
		}
	    
	};

	fontAnimate.prototype={
		//执行动画
		playAnimate:function(){
			var self=this;
			this.styleInit();
			var i = 0;
			var timerOut=setTimeout(function(){
				var timer=setInterval(function () {
		            i=i+parseInt(self.setting.growth);
		            if (i > parseInt(self.number)) {
		                i = parseInt(self.number);
		                clearInterval(timer);
		            }
		             //如果进行千分位分割
		            if(self.setting.split){
		            	self.area.html(self.splitInto(i));
		            }
		            else{
		            	self.area.html(i) ;
		            }
		        }, self.setting.speed);
			},this.setting.delay);
	        
		},
		//只放值不执行动画
		playStatic:function(){
			var self=this;
			this.styleInit();
			self.area.html(self.number); 
		},
		//获取参数
		getSetting:function(){
			var setting=this.area.attr("data-setting");
			if(setting&&setting!=""){
				return $.parseJSON(setting);
			}
			else{
				return {};
			}
		},
		//样式声明
		styleInit:function(){
			var self=this;
			//设置行高
			self.area.css({
				"lineHeight":self.setting.height,
				"textAlign":"center"
			});
		},
		//千分位分割
		splitInto:function(n){
			var self=this;
			//千分分割符
			var sep=this.splitSign||",";
			return (n+'').replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}


	};

	fontAnimate.init=function(areas){
		var _this_=this;
		areas.each(function(){
			new _this_($(this));
		});
	};
	//注册进window对象
	window["fontAnimate"]=fontAnimate;
})(jQuery);