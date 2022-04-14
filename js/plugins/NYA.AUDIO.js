//=============================================================================
// RPG Maker MZ - NYA.AUDIO
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 音频相关
 * @author 赤瞳大白猫
 *
 * @help NYA.AUDIO.js
 *
 * 音频相关指令
 
 * @command playPlayerRoundSe
 * @text 播放距离感音效
 * @desc 在播放音效开始时根据玩家的距离调整音量大小，不适合长音效。
 
 * @arg se
 * @text 音效
 * @desc 要播放的音效
 * @type file
 * @dir audio/se/
 
 * @arg radius
 * @text 最大距离半径
 * @desc 最大距离半径
 * @type number
 * @min 0
 * @default 100
 
 * @arg volume
 * @text 音量
 * @desc 0-100
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 */


(() => {
	const pluginName = "NYA.AUDIO";
	
	PluginManager.registerCommand(pluginName, "playPlayerRoundSe", function(args) {
		const event = this.findEventById(0);
		const cx = event.px;
		const cy = event.py;
		const distance = $gameMap.pixelDistance(cx, cy, $gamePlayer.physicsCenterX(), $gamePlayer.physicsCenterY());
		const maxDistance = Utils.tryParseInt(args.radius);
		if(distance < maxDistance) {
			const volume = (maxDistance - distance) / maxDistance * Utils.tryParseInt(args.volume, 0);
			AudioManager.playSe({name:args.se, volume:volume, pitch:100, pan:0});
		}
    });
	
})();