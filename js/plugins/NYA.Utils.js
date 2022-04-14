/*:
 * @target MZ
 * @plugindesc 一些杂项功能
 * @author 赤瞳大白猫
 *
 * @help NYA.Utils.js
 *
 * 杂项

 * @command add_coin
 * @text 增加钱币
 * @desc 增加钱币
 
 * @arg num
 * @text 增加数量
 * @desc 增加数量
 * @default 0
 * @type number
 
 * @arg antiCollection
 * @text 是否不计入收集品
 * @desc 是否不计入主菜单地图页签显示的收集品数量
 * @default false
 * @type boolean
 
 * @command moveCamera
 * @text 移动镜头
 * @desc 移动镜头，此操作将锁定镜头
 
 * @arg eventId
 * @text 聚焦的事件ID
 * @desc 聚焦的事件ID
 * @default 0
 * @type number
 
 * @arg player
 * @text 是否聚焦到玩家
 * @desc 是否聚焦到玩家
 * @default false
 * @type boolean
 
 * @arg duration
 * @text 移动时间
 * @desc 帧数
 * @default 1
 * @type number
 
 * @arg easingFunc
 * @text 缓动效果类型
 * @desc 函数名字
 * @type select
 * @option linear
 * @value linear
 * @option easeOutQuart
 * @value easeOutQuart
 * @option easeInQuart
 * @value easeInQuart
 * @option easeOutExpo
 * @value easeOutExpo
 * @option easeInExpo
 * @value easeInExpo
 * @option easeOutQuad
 * @value easeOutQuad
 * @option easeInQuad
 * @value easeInQuad
 * @option easeOutBack
 * @value easeOutBack
 * @option easeInBack
 * @value easeInBack
 * @default linear
 
 * @command moveCameraPos
 * @text 移动镜头坐标
 * @desc 移动镜头坐标，此操作将锁定镜头
 
 * @arg duration
 * @text 移动时间
 * @desc 帧数
 * @default 1
 * @type number
 
 * @arg tx
 * @text 镜头X
 * @desc 镜头X
 * @default 0
 * @type number
 
 * @arg ty
 * @text 镜头Y
 * @desc 镜头Y
 * @default 0
 * @type number
 
 * @arg easingFunc
 * @text 缓动效果类型
 * @desc 函数名字
 * @type select
 * @option linear
 * @value linear
 * @option easeOutQuart
 * @value easeOutQuart
 * @option easeInQuart
 * @value easeInQuart
 * @option easeOutExpo
 * @value easeOutExpo
 * @option easeInExpo
 * @value easeInExpo
 * @option easeOutQuad
 * @value easeOutQuad
 * @option easeInQuad
 * @value easeInQuad
 * @option easeOutBack
 * @value easeOutBack
 * @option easeInBack
 * @value easeInBack
 * @default linear
 
 * @command releaseCamera
 * @text 释放镜头控制权
 * @desc 将镜头控制权交还给场景
 
 * @command backCamera
 * @text 镜头返回上次位置
 * @desc 返回上次移动镜头前的位置
 
 * @arg duration
 * @text 移动时间
 * @desc 帧数
 * @default 1
 * @type number
 
 * @command autoSave
 * @text 自动存档
 * @desc 自动存档
 
 * @command addTask
 * @text 接任务
 * @desc 接任务
 
 * @arg taskId
 * @text 任务ID
 * @desc 任务ID
 * @default 0
 * @type number
 
 * @command delTask
 * @text 完成任务
 * @desc 完成任务
 
 * @arg taskId
 * @text 任务ID
 * @desc 任务ID
 * @default 0
 * @type number
 
 * @command removeTask
 * @text 删除任务
 * @desc 删除任务
 
 * @arg taskId
 * @text 任务ID
 * @desc 任务ID
 * @default 0
 * @type number
 
 * @command softGuide
 * @text 显示软引导
 * @desc 显示软引导
 
 * @arg message
 * @text 软引导文案标识
 * @desc 软引导文案标识
 * @type string
 
 * @command clearSoftGuide
 * @text 完成软引导
 * @desc 完成软引导
 
 * @arg signature
 * @text 软引导完成标识
 * @desc 软引导完成标识
 * @type string
 
 * @command hardGuide
 * @text 显示硬引导
 * @desc 显示硬引导
 
 * @arg name
 * @text 引导的资源名
 * @desc 引导的资源名
 * @type string
 
 * @command hasTask
 * @text 判断是否有任务
 * @desc 判断是否有任务
 
 * @arg taskId
 * @text 任务ID
 * @desc 任务ID
 * @default 0
 * @type number
 
 * @command hasTaskComplete
 * @text 判断是否已完成任务
 * @desc 判断是否已完成任务
 
 * @arg taskId
 * @text 任务ID
 * @desc 任务ID
 * @default 0
 * @type number
 
 * @command isCoinLackOfAllShopItems
 * @text 钱是否少于所有商品价格
 * @desc 当前所持金额是否少于全部商品价格
 
 * @command isSelfSwitchOn
 * @text 独立开关是否开启
 * @desc 独立开关是否开启
 
 * @arg mapId
 * @text 地图ID
 * @desc 地图ID，0为当前地图
 * @default 0
 * @type number
 
 * @arg eventId
 * @text 事件ID
 * @desc 事件ID
 * @default 0
 * @type number
 
 * @arg switchName
 * @text 开关类型
 * @desc 开关类型
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 
 * @command addItem
 * @text 增加道具
 * @desc 增加道具
 
 * @arg type
 * @text 道具类型
 * @desc 道具类型
 * @type select
 * @option 消耗品
 * @value consumables
 * @option 武器
 * @value weapons
 * @option 宝石
 * @value stones
 * @option 饰品
 * @value ornaments
 * @option 铃铛
 * @value bell
 
 * @arg idx
 * @text 道具索引
 * @desc 道具索引
 * @default 0
 * @type number
 
 * @arg antiCollection
 * @text 是否不计入收集品
 * @desc 是否不计入主菜单地图页签显示的收集品数量
 * @default false
 * @type boolean
 
 * @command isDemo
 * @text 是否是demo版本
 * @desc 判断是否是demo版本
 
 * @command hasTasksAny
 * @text 判断是否有任一任务
 * @desc 判断是否有任一任务
 
 * @arg taskArr
 * @text 任务ID数组
 * @desc 任务ID数组
 * @type string
 
 * @command setNightEnabled
 * @text 场景的夜晚模式
 * @desc 场景的夜晚模式
 
 * @arg enabled
 * @text 是否开启
 * @desc 是否开启
 * @default false
 * @type boolean
 
 * @command selfSwitchOp
 * @text 独立开关操作
 * @desc 独立开关操作
 
 * @arg mapId
 * @text 地图ID
 * @desc 地图ID，0为当前地图
 * @default 0
 * @type number
 
 * @arg eventId
 * @text 事件ID
 * @desc 事件ID
 * @default 0
 * @type number
 
 * @arg switchName
 * @text 开关类型
 * @desc 开关类型
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 
 * @arg value
 * @text 是否开启
 * @desc 是否开启
 * @default false
 * @type boolean
 
 * @command unlockCg
 * @text 解锁CG
 * @desc 解锁CG
 
 * @arg name
 * @text cg名称
 * @desc cg名称
 * @type string
 
 * @command isZpMax
 * @text 大招能量是否满
 * @desc 大招能量是否满
 
 */

(() => {
	const pluginName = "NYA.Utils";

	PluginManager.registerCommand(pluginName, "add_coin", args => {
		$gamePlayer.addCoin(Utils.tryParseInt(args.num));
    });
	
	PluginManager.registerCommand(pluginName, "moveCamera", function(args) {
		const event = args.player === "true" ? $gamePlayer : this.findEventById(Utils.tryParseInt(args.eventId));
		const tx = event.physicsCenterX() / $gameMap.tileWidth();
		const ty = event.physicsCenterY() / $gameMap.tileHeight();
		const time = Utils.tryParseInt(args.duration);
		$gameMap.setDisplayControlPos(tx, ty, time, args.easingFunc);
	});
	
	PluginManager.registerCommand(pluginName, "moveCameraPos", function(args) {
		const time = Utils.tryParseInt(args.duration);
		const tx = Utils.tryParseInt(args.tx) / $gameMap.tileWidth();
		const ty = Utils.tryParseInt(args.ty) / $gameMap.tileHeight();
		$gameMap.setDisplayControlPos(tx, ty, time, args.easingFunc);
	});
	
	PluginManager.registerCommand(pluginName, "releaseCamera", function(args) {
		$gameMap.clearDisplayControllPos();
	});
	
	PluginManager.registerCommand(pluginName, "backCamera", function(args) {
		const time = Utils.tryParseInt(args.duration);
		$gameMap.revertDisplayControlPos(time);
	});
	
	PluginManager.registerCommand(pluginName, "autoSave", function(args) {
		if(!$gamePlayer.isDeath()) {		// 别存死档啊！
			$gameTemp.requestAutoSave();
		}
	});
	
	PluginManager.registerCommand(pluginName, "addTask", function(args) {
		const taskId = Utils.tryParseInt(args.taskId);
		$gamePlayer.actor().addTask(taskId);
	});
	
	PluginManager.registerCommand(pluginName, "delTask", function(args) {
		const taskId = Utils.tryParseInt(args.taskId);
		$gamePlayer.actor().completeTask(taskId);
	});
	
	PluginManager.registerCommand(pluginName, "removeTask", function(args) {
		const taskId = Utils.tryParseInt(args.taskId);
		$gamePlayer.actor().delTask(taskId);
	});
	
	PluginManager.registerCommand(pluginName, "hasTask", function(args) {
		$gamePlayer.actor().hasTask(Utils.tryParseInt(args.taskId)) ? $gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, true) : $gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, false);
	});
	
	PluginManager.registerCommand(pluginName, "hasTaskComplete", function(args) {
		$gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, $gamePlayer.actor().hasTaskComplete(Utils.tryParseInt(args.taskId)));
	});
	
	PluginManager.registerCommand(pluginName, "softGuide", function(args) {
		$gameSystem.setupSoftGuide(TextManager[args.message]);
	});
	
	PluginManager.registerCommand(pluginName, "clearSoftGuide", function(args) {
		$gameSystem.setGuideCompleted(args.signature);
	});
	
	PluginManager.registerCommand(pluginName, "hardGuide", function(args) {
		$gameSystem.setHardGuide(args.name);
	});
	
	PluginManager.registerCommand(pluginName, "isCoinLackOfAllShopItems", function(args) {
		$gamePlayer.actor().isCoinLackOfAllShowItems() ? $gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, true) : $gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, false);
	});
	
	PluginManager.registerCommand(pluginName, "isSelfSwitchOn", function(args) {
		const mapId = Utils.tryParseInt(args.mapId) || $gameMap.mapId();
		const eventId = Utils.tryParseInt(args.eventId);
		$gameSelfSwitches.value([mapId, eventId, args.switchName]) ? $gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, true) : $gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, false);
	});
	
	PluginManager.registerCommand(pluginName, "addItem", function(args) {
		const type = args.type;
		const idx = Utils.tryParseInt(args.idx);
		$gamePlayer.actor().addItem({type:type, idx:idx}, true);
	});
	
	PluginManager.registerCommand(pluginName, "isDemo", function(args) {
		$gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, NYA.DEMO);
	});
	
	PluginManager.registerCommand(pluginName, "hasTasksAny", function(args) {
		const arr = JSON.parse(args.taskArr);
		const result = arr.some((taskId) => {
			return $gamePlayer.actor().hasTask(taskId);
		});
		$gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, result);
	});
	
	PluginManager.registerCommand(pluginName, "setNightEnabled", function(args) {
		const enabled = Utils.tryParseBoolean(args.enabled);
		$gameMap.setNightEnabled(enabled)
	});
	
	PluginManager.registerCommand(pluginName, "selfSwitchOp", function(args) {
		const mapId = Utils.tryParseInt(args.mapId) || $gameMap.mapId();
		const eventId = Utils.tryParseInt(args.eventId);
		const value = Utils.tryParseBoolean(args.value);
		$gameSelfSwitches.setValue([mapId, eventId, args.switchName], value);
	});
	
	PluginManager.registerCommand(pluginName, "unlockCg", function(args) {
		ConfigManager.unlockCG(args.name);
	});
	
	PluginManager.registerCommand(pluginName, "isZpMax", function(args) {
		$gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, $gamePlayer.battleObject().zp >= $gamePlayer.battleObject().mzp);
	});
})();