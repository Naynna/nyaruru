//=============================================================================
// RPG Maker MZ - NYA.BOSS_ACHIEVES
//=============================================================================

/*:
 * @target MZ
 * @plugindesc BOSS评分
 * @author 赤瞳大白猫
 *
 * @help NYA.BOSS_ACHIEVES.js
 *
 * BOSS评分相关指令
 
 * @command recordBossScore
 * @text 开始记录boss的评分
 * @desc 开始记录boss的评分
 
 * @command endRecordBossScore
 * @text 生成boss的评分
 * @desc 生成boss的评分，并且关闭记录状态
 
 * @arg battleObjectId
 * @text boss的battleObjectId
 * @desc boss的battleObjectId，见nya_game_system
 * @type number
 * @default 0
 *
 */


(() => {
	const pluginName = "NYA.BOSS_ACHIEVES";
	
	PluginManager.registerCommand(pluginName, "recordBossScore", args => {
        $gamePlayer.startRecordBossScore();
    });
	
	PluginManager.registerCommand(pluginName, "endRecordBossScore", args => {
		$gamePlayer.endRecordBossScore(Utils.tryParseInt(args.battleObjectId));
    });
	
})();