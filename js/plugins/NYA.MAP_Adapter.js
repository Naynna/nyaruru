//=============================================================================
// RPG Maker MZ - ULDS
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 改变玩家切地图时的过渡效果
 * @author 赤瞳大白猫
 *
 * @help NYA.MAP_Adapter.js
 *
 * 改变玩家切地图时的过渡效果
 
 * @command change_fade
 * @text 改变切地图时的过渡效果
 * @desc 下一次切地图时，自带的淡入淡出效果将会被替换成设置的效果
 *
 * @arg fadeType
 * @text 过渡效果
 * @desc 过渡效果
 * @default 1
 * @type select
 * @option 圆形扩散
 * @value 1
 * @option 方形帷幕-左
 * @value 2
 * @option 方形帷幕-上
 * @value 3
 * @option 方形帷幕-右
 * @value 4
 * @option 方形帷幕-下
 * @value 5
 * @option 猫爪
 * @value 6
 
 * @arg speed
 * @text 动画播放速度
 * @desc 填0则采用系统默认速度
 * @default 0
 * @type number
 
 * @arg delay
 * @text 切图延迟时间
 * @desc 切图延迟时间
 * @default 48
 * @type number
 
 * @command set_picture_curtain
 * @text 给图片增加帷幕效果
 * @desc 给图片增加帷幕拉开的效果
 
 * @arg pictureId
 * @text 图片编号
 * @desc 图片编号
 * @default 1
 * @type number
 
 * @arg width
 * @text 过渡带的宽度
 * @desc 与图片实际宽度的比率
 * @default 0.1
 * @type string
 
 * @arg speed
 * @text 过渡的速度
 * @desc 与图片实际宽度的比率
 * @default 0.025
 * @type string
 *
 */


(() => {
	const pluginName = "NYA.MAP_Adapter";
	
	PluginManager.registerCommand(pluginName, "change_fade", args => {
        const fadeType = Utils.tryParseInt(args.fadeType, 0);
		const speed = Utils.tryParseInt(args.speed, 0);
		const delay = Utils.tryParseInt(args.delay, 0);
		$gamePlayer.reserveTransferFade(fadeType, speed, delay);
    });
	
	PluginManager.registerCommand(pluginName, "set_picture_curtain", args => {
        const pictureId = Utils.tryParseInt(args.pictureId, 0);
		const width = Utils.tryParseNumber(args.width, 0);
		const speed = Utils.tryParseNumber(args.speed, 0);
		const picture = $gameScreen.picture(pictureId);
		if(picture) {
			picture.setCurtainEffect(width, speed);
		}
    });
	
})();