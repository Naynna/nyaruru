//=============================================================================
// RPG Maker MZ - NYA.LILY
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 莉莉亚的相关指令
 * @author 赤瞳大白猫
 *
 * @help NYA.LILY.js
 *
 * 莉莉亚的相关指令
 
 * @command uniqueFloatMessage
 * @text 触发唯一气球对话
 * @desc 该对话会只出现一次
 *
 * @arg storyId
 * @text 故事文案的ID
 * @desc 故事文案的ID
 * @default 0
 * @type number
 
 * @command isLilySuitable
 * @text 莉莉亚是否在视野内
 * @desc 莉莉亚是否处在队友模式，并且处于合适状态
 
 * @command isLilyPartner
 * @text 莉莉亚是否是队友
 * @desc 莉莉亚是否处在队友模式
 
 * @command setSpecMoveCommand
 * @text 设置临时目标点
 * @desc 设置临时目标点
 *
 * @arg x
 * @text 目标X
 * @desc 目标X
 * @default 0
 * @type number
 
 * @arg y
 * @text 目标Y
 * @desc 目标Y
 * @default 0
 * @type number
 
 * @arg direction
 * @text 目标朝向
 * @desc 目标朝向
 * @type select
 * @option 朝左
 * @value 4
 * @option 朝右
 * @value 6
 * @default 4
 
 * @command waitSpecMoveCommand
 * @text 等待临时目标点完成
 * @desc 等待临时目标点寻路完成
 *
 */


(() => {
	const pluginName = "NYA.LILY";
	
	PluginManager.registerCommand(pluginName, "uniqueFloatMessage", args => {
        const storyId = Utils.tryParseInt(args.storyId, 0);
		$gameLily.triggerUniqueFloatMessage(storyId);
    });
	
	PluginManager.registerCommand(pluginName, "isLilySuitable", args => {
		const result = !$gameLily.isRemove() && $gameLily.pixelDistanceToPlayer() <= $gameLily.floatMessageTriggerDistance();
		$gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, result);
    });
	
	PluginManager.registerCommand(pluginName, "isLilyPartner", args => {
		const result = !$gameLily.isRemove();
		$gameSwitches.setValue(NYA.GAME.PLUGIN_TEST, result);
    });
	
	PluginManager.registerCommand(pluginName, "setSpecMoveCommand", args => {
		$gameLily.setSpecMoveCommand(Utils.tryParseInt(args.x), Utils.tryParseInt(args.y), Utils.tryParseInt(args.direction, 4));
    });
	
	PluginManager.registerCommand(pluginName, "waitSpecMoveCommand", function(args) {
		this.setWaitMode("lily_specMove");
    });
	
})();