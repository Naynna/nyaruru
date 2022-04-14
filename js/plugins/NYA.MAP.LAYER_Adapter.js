//=============================================================================
// RPG Maker MZ - ULDS
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 无限图层显示系统
 * @author 赤瞳大白猫
 *
 * @help NYA.MAP.LAYER_Adapter.js
 *
 * 这个插件可以在地图上显示自定义图层，可通过插件指令动态修改，做出的修改将被带入存档。
 *
 * 在地图备注上写入如下格式的信息可以创建一个图层
 *   <layer name:layer1,res:pictureName,alpha:1,z:22,scrollX:1,scrollY:1,offsetX:0,offsetY:0,blendMode:0>
 *   在这串信息里，你能看到许多AA:BB这样格式的分段，它们被逗号隔开，其中AA是属性名，BB是属性值
 *	 除了name属性，每个属性都有默认的缺省值，就算你把他们全部省略，变成<layer name:layer1>，该信息仍然会正常生效。
 *   每个属性的意义和默认值如下：
 *   name：图层的名字（必填）
 *   res：图片的文件名，需要放在img/overlays文件夹下，默认值为name属性填的值
 *   alpha：图层的透明度，取值范围0-1，默认1
 *   z：图层的z值，z值大的图层总是显示在z值小的图层的上方，默认0
 *   scrollX：图层的x坐标跟随玩家视角一起移动的相对比率，一般来说如果是远景，此值填0，如果是近景此值填1，默认1
 *   scrollY：图层的y坐标跟随玩家视角一起移动的相对比率，一般来说如果是远景，此值填0，如果是近景此值填1，默认1
 *   offsetX：图层的x坐标偏移量，默认0
 *   offsetY：图层的y坐标偏移量，默认0
 *   blendMode：图层的混合模式，0正常1叠加2正片叠底3滤色，默认0
 *   type：图层的滚动模式，normal正常tiling像地板砖一样平铺，默认normal
 *   originX：图层的X轴滚动速度，只在tiling模式下有效，默认0
 *   originY：图层的Y轴滚动速度，只在tiling模式下有效，默认0
 * 
 * 同时，你也可以通过插件指令动态的修改图层的属性，做出的修改将被带入存档。
 * 在游戏过程中通过插件指令动态的修改图层的贴图时，因为贴图从硬盘中读取需要时间，可能会造成显示延迟和闪烁的问题，你必须自己处理预加载。
 * 不过，每当进入一个新地图，插件都会从地图备注重新初始化图层信息，通过插件指令做出的修改将会被重置。
 
 * @command set_res
 * @text 设置图层的文件名
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图片文件名
 * @desc 图片文件名
 * @default 
 * @require 1
 * @dir img/overlays/
 * @type file
 
 * @command set_alpha
 * @text 设置图层的透明度
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图层的透明度
 * @desc 取值范围0-1
 * @default 1
 * @type string
 
 * @command set_z
 * @text 设置图层的z值
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图层的z值
 * @desc 取值范围0-99
 * @default 0
 * @type number
 * @min 0
 * @max 99
 
 * @command set_blendMode
 * @text 设置图层的混合模式
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 混合模式
 * @desc 混合模式
 * @default 0
 * @type select
 * @option 正常
 * @value 0
 * @option 叠加
 * @value 1
 * @option 正片叠底
 * @value 2
 * @option 滤色
 * @value 3
 
 * @command set_offsetX
 * @text 设置图层的X轴偏移值
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图层的X轴偏移值
 * @desc 
 * @default 0
 * @type number
 
 * @command set_offsetY
 * @text 设置图层的Y轴偏移值
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图层的Y轴偏移值
 * @desc 
 * @default 0
 * @type number
 
 * @command set_originX
 * @text 设置图层的X轴滚动速度
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图层的X轴滚动速度
 * @desc 
 * @default 0
 * @type number
 
 * @command set_originY
 * @text 设置图层的Y轴滚动速度
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg property
 * @text 图层的Y轴滚动速度
 * @desc 
 * @default 0
 * @type number
 
 * @command del
 * @text 删除图层
 * @desc 
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @command add
 * @text 新建图层
 * @desc 必填项：图片文件名，其余选填
 *
 * @arg name
 * @type string
 * @text 图层的名字
 * @desc 图层的名字
 *
 * @arg res
 * @text 图片文件名（必填）
 * @desc 图片文件名
 * @default 
 * @require 1
 * @dir img/overlays/
 * @type file
 *
 * @arg alpha
 * @text 图层的透明度
 * @desc 取值范围0-1
 * @default 1
 * @type string
 *
 * @arg z
 * @text 图层的z值
 * @desc 取值范围0-99
 * @default 0
 * @type number
 * @min 0
 * @max 99
 *
 * @arg blendMode
 * @text 混合模式
 * @desc 混合模式
 * @default 0
 * @type select
 * @option 正常
 * @value 0
 * @option 叠加
 * @value 1
 * @option 正片叠底
 * @value 2
 * @option 滤色
 * @value 3
 *
 * @arg scrollX
 * @text X轴跟随移动比率
 * @desc 取值范围0-1
 * @default 1
 * @type string
 *
 * @arg scrollY
 * @text Y轴跟随移动比率
 * @desc 取值范围0-1
 * @default 1
 * @type string
 *
 * @arg offsetX
 * @text 图层的X坐标偏移量
 * @default 0
 * @type number
 *
 * @arg offsetY
 * @text 图层的Y坐标偏移量
 * @default 0
 * @type number
 *
 * @arg type
 * @text 图层类型
 * @desc normal正常tiling像地板砖一样平铺
 * @default normal
 * @type select
 * @option 正常
 * @value normal
 * @option 像地板砖一样平铺
 * @value tiling
 *
 * @arg originX
 * @text 图层的X轴滚动速度
 * @desc 图层的X轴滚动速度，只在tiling模式下有效
 * @default 0
 * @type number
 *
 * @arg originY
 * @text 图层的Y轴滚动速度
 * @desc 图层的Y轴滚动速度，只在tiling模式下有效
 * @default 0
 * @type number
 
 * @command setAmbientLight
 * @text 设置环境光
 * @desc 设置环境光
 
 * @arg upper
 * @text 高层光
 * @desc 1最亮0黑暗
 * @default 1
 * @type number
 
 * @arg lower
 * @text 低层光
 * @desc 1最亮0黑暗
 * @default 1
 * @type number
 *
 */


(() => {
	const pluginName = "NYA.MAP.LAYER_Adapter";
	
	PluginManager.registerCommand(pluginName, "del", args => {
        const name = args.name;
		let layers = $gameMap.layerInfo();
		delete layers[name];
    });
	
	PluginManager.registerCommand(pluginName, "set_res", args => {
        const name = args.name;
		const res = args.property;
		let layers = $gameMap.layerInfo();
		layers[name].res = res;
    });
	
	PluginManager.registerCommand(pluginName, "set_alpha", args => {
        const name = args.name;
		const alpha = Utils.tryParseNumber(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].alpha = alpha;
    });
	
	PluginManager.registerCommand(pluginName, "set_blendMode", args => {
        const name = args.name;
		const mode = Utils.tryParseInt(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].blendMode = mode;
    });
	
	PluginManager.registerCommand(pluginName, "set_z", args => {
        const name = args.name;
		const z = Utils.tryParseInt(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].z = z;
    });
	
	PluginManager.registerCommand(pluginName, "set_offsetX", args => {
        const name = args.name;
		const offsetX = Utils.tryParseInt(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].offsetX = offsetX;
    });
	
	PluginManager.registerCommand(pluginName, "set_offsetY", args => {
        const name = args.name;
		const offsetY = Utils.tryParseInt(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].offsetY = offsetY;
    });
	
	PluginManager.registerCommand(pluginName, "set_originX", args => {
        const name = args.name;
		const originX = Utils.tryParseInt(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].originX = originX;
    });
	
	PluginManager.registerCommand(pluginName, "set_originY", args => {
        const name = args.name;
		const originY = Utils.tryParseInt(args.property);
		let layers = $gameMap.layerInfo();
		layers[name].originY = originY;
    });
	
	PluginManager.registerCommand(pluginName, "add", args => {
        $gameMap.createTilemapLayer(args);
    });
	
	PluginManager.registerCommand(pluginName, "setAmbientLight", args => {
		const lowerChannel = Math.round(Utils.tryParseNumber(args.lower) * 255);
		$gameMap._lowerAmbientLight = lowerChannel << 16 | lowerChannel << 8 | lowerChannel;
        const upperChannel = Math.round(Utils.tryParseNumber(args.upper) * 255);
		$gameMap._upperAmbientLight = upperChannel << 16 | upperChannel << 8 | upperChannel;
    });
	
})();