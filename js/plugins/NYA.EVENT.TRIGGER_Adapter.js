/*:
 * @target MZ
 * @plugindesc 事件流程控制
 * @author 赤瞳大白猫
 *
 * @help NYA.EVENT.TRIGGER_Adapter.js
 *
 * 事件流程的各种杂项功能
 
 * @command range
 * @text 设置玩家接触范围
 * @desc 设置该事件的接触范围，当触发类型为【事件接触】时，即使玩家不按交互键也会立即触发
 *
 * @arg l
 * @text 左边界
 * @desc 以事件贴图矩形的几何中心为参考点，填0则依据事件贴图本身
 * @default 0
 * @type number
 
 * @arg t
 * @text 上边界
 * @desc 以事件贴图矩形的几何中心为参考点，填0则依据事件贴图本身
 * @default 0
 * @type number
 
 * @arg r
 * @text 右边界
 * @desc 以事件贴图矩形的几何中心为参考点，填0则依据事件贴图本身
 * @default 0
 * @type number
 
 * @arg b
 * @text 下边界
 * @desc 以事件贴图矩形的几何中心为参考点，填0则依据事件贴图本身
 * @default 0
 * @type number
 
 * @arg tips
 * @text 头顶气泡显示文字
 * @desc 不超过4字母
 * @type string
 
 * @arg se
 * @text 触发音效
 * @desc 触发音效
 * @type file
 * @dir audio/se/
 
 * @arg transfer
 * @text 是否是传送事件
 * @desc 这个选项决定该事件是否是存在于地图边缘的传送门，对此有特殊处理
 * @default false
 * @type boolean
 
 * @arg dir
 * @text 是否是按下触发
 * @desc 只在按确定键触发的事件中生效
 * @default false
 * @type boolean
 
 * @command stroke
 * @text 开启描边闪烁特效
 * @desc 本事件开启描边闪烁特效
 
 * @arg enable
 * @text 是否开启
 * @desc 是否开启
 * @default false
 * @type boolean
 
 * @command sync
 * @text 设置位置同步该事件
 * @desc 某事件位置同步绑定该事件
 
 * @arg evid
 * @text 事件ID
 * @desc 事件ID
 * @default 0
 * @type number
 
 * @command recover_switch
 * @text 设置开关自动关闭
 * @desc 设置开关自动关闭
 
 * @arg id
 * @text 开关
 * @desc 开关
 * @default 0
 * @type switch
 
 * @arg min
 * @text 随机最低值
 * @desc 随机最低值
 * @default 0
 * @type number
 
 * @arg max
 * @text 随机最高值
 * @desc 随机最高值
 * @default 0
 * @type number
 
 * @command random_wait
 * @text 事件解释器随机等待
 * @desc 事件解释器随机等待指定帧
 
 * @arg min
 * @text 随机最低值
 * @desc 随机最低值
 * @default 0
 * @type number
 
 * @arg max
 * @text 随机最高值
 * @desc 随机最高值
 * @default 0
 * @type number
 
 * @command check_erase
 * @text 检查事件是否被消除
 * @desc 根据指定事件是否被暂时消除决定解释器是否继续执行
 
 * @arg evid
 * @text 事件ID
 * @desc 事件ID
 * @default 0
 * @type number
 
 * @command mirror
 * @text 水平翻转显示本事件
 * @desc 主要用于非战斗对象纯贴图事件
 
 * @command effect
 * @text 事件附加特效
 * @desc 事件附加特效
 
 * @arg effectId
 * @text 特效id
 * @desc 特效id
 * @default 0
 * @type animation
 
 * @command effect_scale
 * @text 增加特效的缩放
 * @desc 增加附加特效的缩放比率
 
 * @arg evid
 * @text 事件ID
 * @desc 事件ID
 * @default 0
 * @type number
 
 * @arg scale
 * @text 缩放比率增加量
 * @desc 缩放比率增加量
 * @default 0
 * @type string
 
 */

(() => {
	const pluginName = "NYA.EVENT.TRIGGER_Adapter";
	
	PluginManager.registerCommand(pluginName, "range", function(args) {
		const event = this.event();
		if((event._trigger === 3 || event._trigger === 4) && !this.event().isPlayerHitEvent(-1)) {
			this.terminate();
		}
    });
	
	PluginManager.registerCommand(pluginName, "stroke", args => {
    });
	
	PluginManager.registerCommand(pluginName, "recover_switch", args => {
		const time = Utils.randomInt(Utils.tryParseInt(args.min), Utils.tryParseInt(args.max));
		const id = args.id;
		$gameSwitches.setAutoRecover(id, time);
    });
	
	PluginManager.registerCommand(pluginName, "random_wait", function(args) {
		const time = Utils.randomInt(Utils.tryParseInt(args.min), Utils.tryParseInt(args.max));
		this.wait(time);
    });
	
	PluginManager.registerCommand(pluginName, "check_erase", function(args) {
		const eventId = Utils.tryParseInt(args.evid);
		if(!this.findEventById(eventId).isErased()) {
			this.terminate();
		}
    });
	
	PluginManager.registerCommand(pluginName, "effect_scale", function(args) {
		const eventId = Utils.tryParseInt(args.evid);
		this.findEventById(eventId).setSyncEffectScaleAdd(Utils.tryParseNumber(args.scale));
    });
})();