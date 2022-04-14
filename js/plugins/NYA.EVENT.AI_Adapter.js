/*:
 * @target MZ
 * @plugindesc 事件的AI附加内容
 * @author 赤瞳大白猫
 *
 * @help NYA.EVENT.AI_Adapter.js
 *
 * 为事件附加AI实现
 
 * @command ai
 * @text 设置事件AI内容
 * @desc 根据事件页的生效与否决定事件的AI内容，不考虑事件页的触发方式
 *
 * @arg fix
 * @text 不受外力影响
 * @desc 在物理引擎中是否不受外力影响
 * @default false
 * @type boolean
 
 * @arg type
 * @text AI类型
 * @desc 内部实现的AI类型
 * @default 0
 * @type number
 
 * @arg smoothfloor
 * @text 着陆类型
 * @desc 从空中着陆true还是从地里拔出到地面false
 * @default false
 * @type boolean
 
 * @arg battleObject
 * @text 战斗对象
 * @desc 为事件附加战斗对象
 * @default 0
 * @type number
 
 * @arg direction
 * @text 初始朝向
 * @desc 初始朝向
 * @type select
 * @option 朝左
 * @value 4
 * @option 朝右
 * @value 6
 * @default 4
 
 * @arg skipSmoothfloor
 * @text 跳过着陆搜索
 * @desc 开启后着陆类型设置无效
 * @default false
 * @type boolean
 
 * @command terrain_damage
 * @text 设置事件的触碰伤害
 * @desc 设置事件的触碰伤害
 
 * @arg damage
 * @text 伤害值
 * @desc 伤害值
 * @default 0
 * @type number
 
 * @arg staggerTime
 * @text 硬直时间
 * @desc 硬直时间
 * @default 0
 * @type number
 
 * @arg fx
 * @text 受力x
 * @desc x方向施加力道
 * @default 0
 * @type number
 
 * @arg fy
 * @text 受力y
 * @desc y方向施加力道
 * @default 0
 * @type number
 
 * @arg alive
 * @text 存活有效
 * @desc 如果该事件为战斗单位，指示触碰伤害是否仅在该单位存活时有效
 * @default false
 * @type boolean
 
 * @arg mirror
 * @text 根据朝向受力
 * @desc 是否要根据角色朝向自动反转x轴受力值
 * @default false
 * @type boolean
 
 * @arg real
 * @text 是否是真实伤害
 * @desc 是否是真实伤害
 * @default false
 * @type boolean
 
 * @arg moveBack
 * @text 是否强制角色复位
 * @desc 是否强制角色复位
 * @default false
 * @type boolean
 
 * @command attach_vertices
 * @text 设置事件的碰撞多边形
 * @desc 引用tmx文件里编辑的具有ID属性的碰撞多边形
 
 * @arg verticesId
 * @text ID
 * @desc 碰撞对象的ID属性
 * @default 0
 * @type number
 
 * @command message
 * @text 指示事件进行气球谈话
 * @desc 指示事件进行气球谈话，不锁玩家操作
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg storyId
 * @text 故事ID
 * @desc xlsx文件里声明的文字ID
 * @default 0
 * @type number
 
 * @command random_message
 * @text 指示事件随机气球谈话
 * @desc 指示事件随机气球谈话
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg story
 * @text 随机故事ID列表
 * @desc xlsx文件里声明的文字ID，1,2,3这种格式，逗号隔开
 * @type string
 
 * @command player_message
 * @text 指示玩家进行气球谈话
 * @desc 指示玩家进行气球谈话，不锁玩家操作
 
 * @arg storyId
 * @text 故事ID
 * @desc xlsx文件里声明的文字ID
 * @default 0
 * @type number
 
 * @command pause_ai
 * @text 暂停某个事件的AI
 * @desc 暂停某个事件内建的AI逻辑
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
  
 * @command resume_ai
 * @text 继续某个事件的AI
 * @desc 继续某个事件内建的AI逻辑
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @command face
 * @text 事件和玩家面对面
 * @desc 事件和玩家面对面
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @command face_event
 * @text 两个事件面对面
 * @desc 两个事件面对面
 
 * @arg eventId1
 * @text 事件ID1
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg eventId2
 * @text 事件ID2
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @command moveTo
 * @text 事件移动到某个坐标
 * @desc 事件移动到某个坐标
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg x
 * @text X坐标
 * @desc 目标X坐标
 * @default 0
 * @type number
 
 * @arg y
 * @text Y坐标
 * @desc 目标Y坐标
 * @default 0
 * @type number
 
 * @arg direction
 * @text 朝向
 * @desc 目标朝向
 * @type select
 * @option 朝左
 * @value 4
 * @option 朝右
 * @value 6
 * @default 4
 
 * @command moveToScreenEdge
 * @text 事件移动到屏幕外
 * @desc 事件移动到屏幕外
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg direction
 * @text 朝向
 * @desc 左边界还是右边界
 * @type select
 * @option 左边界
 * @value 4
 * @option 右边界
 * @value 6
 * @default 4
 
 * @command moveToAdvance
 * @text 事件寻路到某个坐标
 * @desc 更智能，但不稳定
 
 * @arg eventId
 * @text 事件ID
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg x
 * @text X坐标
 * @desc 目标X坐标
 * @default 0
 * @type number
 
 * @arg y
 * @text Y坐标
 * @desc 目标Y坐标
 * @default 0
 * @type number
 
 * @arg direction
 * @text 朝向
 * @desc 目标朝向
 * @type select
 * @option 朝左
 * @value 4
 * @option 朝右
 * @value 6
 * @default 4
 
 * @arg gridWidth
 * @text X寻路精度
 * @desc 决定寻路的精度
 * @default 48
 * @type number
 
 * @arg gridHeight
 * @text Y寻路精度
 * @desc 决定寻路的精度
 * @default 48
 * @type number
 
 * @command wait_ai
 * @text 等待所有AI指令完成
 * @desc 等待当前地图所有AI指令执行完毕
 
 * @command eventOffset
 * @text 设置事件偏移量
 * @desc 设置本事件偏移量
 
 * @arg ox
 * @text X偏移量
 * @desc X偏移量
 * @default 0
 * @type number
 
 * @arg oy
 * @text Y偏移量
 * @desc Y偏移量
 * @default 0
 * @type number
 
 * @command setPath
 * @text 设置随机目标点
 * @desc 设置AI的随机行走目标点
 
 * @arg x1
 * @text x1
 * @desc x1
 * @default 0
 * @type number
 
 * @arg y1
 * @text y1
 * @desc y1
 * @default 0
 * @type number
 
 * @arg smooth1
 * @text smooth1
 * @desc smooth1
 * @default 0
 * @type number
 
 * @arg x2
 * @text x2
 * @desc x2
 * @default 0
 * @type number
 
 * @arg y2
 * @text y2
 * @desc y2
 * @default 0
 * @type number
 
 * @arg smooth2
 * @text smooth2
 * @desc smooth2
 * @default 0
 * @type number
 
 * @arg x3
 * @text x3
 * @desc x3
 * @default 0
 * @type number
 
 * @arg y3
 * @text y3
 * @desc y3
 * @default 0
 * @type number
 
 * @arg smooth3
 * @text smooth3
 * @desc smooth3
 * @default 0
 * @type number
 
 * @arg x4
 * @text x4
 * @desc x4
 * @default 0
 * @type number
 
 * @arg y4
 * @text y4
 * @desc y4
 * @default 0
 * @type number
 
 * @arg smooth4
 * @text smooth4
 * @desc smooth4
 * @default 0
 * @type number
 
 * @arg x5
 * @text x5
 * @desc x5
 * @default 0
 * @type number
 
 * @arg y5
 * @text y5
 * @desc y5
 * @default 0
 * @type number
 
 * @arg smooth5
 * @text smooth5
 * @desc smooth5
 * @default 0
 * @type number
 
 * @arg minWaiting
 * @text minWaiting
 * @desc minWaiting
 * @default 0
 * @type number
 
 * @arg maxWaiting
 * @text maxWaiting
 * @desc maxWaiting
 * @default 0
 * @type number
 
 * @command upForTransfer
 * @text 静态角色往上传送
 * @desc 设置莉莉亚等静态角色往上传送的跳跃状态
 
 * @arg vy
 * @text 往上跳的速度
 * @desc 往上跳的速度
 * @default 0
 * @type number
 
 * @command eventStateSync
 * @text 同步两个事件状态
 * @desc 同步两个事件状态
 
 * @arg eventId1
 * @text 源事件
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @arg eventId2
 * @text 目标事件
 * @desc 0为本事件
 * @default 0
 * @type number
 
 * @command setBattleObjectPara
 * @text 设置AI的参数
 * @desc 实际就是this.battleObject().name = para;
 
 * @arg name
 * @text 参数名
 * @desc 参数名
 * @type string
 
 * @arg para
 * @text 参数值
 * @desc 参数值
 * @type string
 
 * @arg comment
 * @text 注释
 * @desc 注释
 * @type string
 
 * @command setLight
 * @text 设置事件灯光
 * @desc 设置事件灯光
 
 * @arg r
 * @text 颜色R
 * @desc 颜色R
 * @type string
 * @default 1
 
 * @arg g
 * @text 颜色G
 * @desc 颜色G
 * @type string
 * @default 1
 
 * @arg b
 * @text 颜色B
 * @desc 颜色B
 * @type string
 * @default 1
 
 * @arg max
 * @text 中心点灯光强度
 * @desc 已弃用
 * @type string
 * @default 1
 
 * @arg radius
 * @text 灯光范围半径
 * @desc 灯光范围半径
 * @type number
 * @default 100
 
 * @arg upper
 * @text 是否为高层光
 * @desc 是否为高层光
 * @default false
 * @type boolean
 
 * @arg type
 * @text 光照类型
 * @desc 光照类型
 * @type select
 * @option MULTIPLY
 * @value 0
 * @option ADD
 * @value 1
 * @default 0
 
 * @arg night
 * @text 限定夜晚模式
 * @desc 限定夜晚模式
 * @default false
 * @type boolean
 
 * @command setLilyPartner
 * @text 莉莉亚队友模式
 * @desc 是否开启莉莉亚队友模式
 
 * @arg open
 * @text 是否开启
 * @desc 是否开启
 * @default false
 * @type boolean
 
 */

(() => {
	const pluginName = "NYA.EVENT.AI_Adapter";
	
	PluginManager.registerCommand(pluginName, "ai", args => {
    });
	
	PluginManager.registerCommand(pluginName, "terrain_damage", args => {
    });
	
	PluginManager.registerCommand(pluginName, "attach_vertices", args => {
    });
	
	PluginManager.registerCommand(pluginName, "message", function(args) {
		const storyId = Utils.tryParseInt(args.storyId);
		const eventId = Utils.tryParseInt(args.eventId);
		const event = this.findEventById(eventId);
		if(!event._statemPause) {
			this.findEventById(eventId).requestFloatMessage(storyId);
		}
    });
	
	PluginManager.registerCommand(pluginName, "random_message", function(args) {
		const storyId = JSON.parse("[" + args.story + "]").randomElement();
		const eventId = Utils.tryParseInt(args.eventId);
		const event = this.findEventById(eventId);
		if(!event._statemPause) {
			this.findEventById(eventId).requestFloatMessage(storyId);
		}
    });
	
	PluginManager.registerCommand(pluginName, "player_message", function(args) {
		const storyId = Utils.tryParseInt(args.storyId);
		$gamePlayer.requestFloatMessage(storyId);
    });
	
	PluginManager.registerCommand(pluginName, "moveTo", function(args) {
		const eventId = Utils.tryParseInt(args.eventId);
		const event = this.findEventById(eventId);
		event.pauseStatem();
		const x = Utils.tryParseInt(args.x);
		const y = Utils.tryParseInt(args.y);
		const direction = Utils.tryParseInt(args.direction);
		event.setCommonCommand("moveTo", {x:x, y:y, direction:direction});
    });
	
	PluginManager.registerCommand(pluginName, "moveToScreenEdge", function(args) {
		const eventId = Utils.tryParseInt(args.eventId);
		const event = this.findEventById(eventId);
		event.pauseStatem();
		const direction = Utils.tryParseInt(args.direction);
		event.setCommonCommand("moveToScreenEdge", {direction:direction});
    });
	
	PluginManager.registerCommand(pluginName, "moveToAdvance", function(args) {
		const eventId = Utils.tryParseInt(args.eventId);
		const event = this.findEventById(eventId);
		event.pauseStatem();
		const x = Utils.tryParseInt(args.x);
		const y = Utils.tryParseInt(args.y);
		const direction = Utils.tryParseInt(args.direction);
		const gridWidth = Utils.tryParseInt(args.gridWidth);
		const gridHeight = Utils.tryParseInt(args.gridHeight);
		event.setCommonCommand("moveToAdvance", {x:x, y:y, direction:direction, gridWidth:gridWidth, gridHeight:gridHeight});
    });
	
	PluginManager.registerCommand(pluginName, "resume_ai", function(args) {
		const eventId = Utils.tryParseInt(args.eventId);
		this.findEventById(eventId).resumeStatem();
    });
	
	PluginManager.registerCommand(pluginName, "pause_ai", function(args) {
		const eventId = Utils.tryParseInt(args.eventId);
		this.findEventById(eventId).pauseStatem();
    });
	
	PluginManager.registerCommand(pluginName, "wait_ai", function(args) {
		this.setWaitMode("ai_command");
    });
	
	PluginManager.registerCommand(pluginName, "face", function(args) {
		const eventId = Utils.tryParseInt(args.eventId);
		const event = this.findEventById(eventId);
		event.setDirection($gamePlayer.px > event.px ? 6 : 4);
		$gamePlayer.setDirection(event.direction() === 4 ? 6 : 4);
    });
	
	PluginManager.registerCommand(pluginName, "face_event", function(args) {
		const eventId1 = Utils.tryParseInt(args.eventId1);
		const eventId2 = Utils.tryParseInt(args.eventId2);
		const event1 = this.findEventById(eventId1);
		const event2 = this.findEventById(eventId2);
		if(!event1._statemPause && !event2._statemPause) {
			event1.setDirection(event2.px > event1.px ? 6 : 4);
			event2.setDirection(event1.direction() === 4 ? 6 : 4);
		}
    });
	
	PluginManager.registerCommand(pluginName, "upForTransfer", function(args) {
		$gameSystem.setStaticCharacterUpForTransfer(Utils.tryParseInt(args.vy));
	});
	
	PluginManager.registerCommand(pluginName, "eventStateSync", function(args) {
		const eventId1 = Utils.tryParseInt(args.eventId1);
		const eventId2 = Utils.tryParseInt(args.eventId2);
		const eventSrc = this.findEventById(eventId1);
		const eventDes = this.findEventById(eventId2);
		eventDes.attachEventState(eventSrc);
	});
	
	PluginManager.registerCommand(pluginName, "setBattleObjectPara", function(args) {
	});
	
	PluginManager.registerCommand(pluginName, "setLight", function(args) {
	});
	
	PluginManager.registerCommand(pluginName, "setLilyPartner", function(args) {
		$gameLily.setRemove(args.open !== "true");
	});
})();