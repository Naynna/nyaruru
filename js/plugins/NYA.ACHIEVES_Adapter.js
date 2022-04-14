//=============================================================================
// RPG Maker MZ - External Story
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 调用excel中的故事文案
 * @author 赤瞳大白猫
 *
 * @help NYA.ACHIEVES_Adapter.js
 *
 * 调用excel中的预设的故事文案，且可在excel中书写类似等待，调用公共事件，调用指定故事的嵌套功能。
 
 * @command call_story
 * @text 调用故事序列
 * @desc 显示excel中编辑的故事序列
 *
 * @arg id
 * @text 故事序列的ID
 * @desc 通常在excel中的第一列
 * @default 0
 * @type number
 *
 */


(() => {
	const pluginName = "NYA.ACHIEVES_Adapter";
	
	PluginManager.registerCommand(pluginName, "call_story", function(args) {
        const id = Utils.tryParseInt(args.id, 0);
		this.setupStoryChild(id);
    });
	
})();