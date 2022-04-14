//=============================================================================
// main.js v1.4.0
//=============================================================================

// boot script
"use strict";
(() => {
	if(typeof window === "object") {
		window.NYA = window.NYA || {};
		NYA.DEBUG = false;
		NYA.NWBIN = false;
		NYA.DEMO = true;
		NYA.LEGAL = false;
		NYA.STEAMAPPID = 1478160;
		NYA.STEAMDEMOAPPID = 1589870;
		NYA.VERSION = 29;
	}
})();

const scriptUrls = [
    "js/libs/pixi.js",
	"js/libs/pixi-filters.js",
	"js/libs/pixi-tilemap.umd.js",
    "js/libs/pako.min.js",
    "js/libs/localforage.min.js",
    "js/libs/effekseer.min.js",
    "js/libs/vorbisdecoder.js",
	"js/libs/live2dcubismcore.min.js",
	"js/libs/live2dcubismframework.js",
	"js/libs/live2dcubismpixi.js",
	"js/libs/bezier_easing.js",
	"js/libs/keycode.js",
	"js/libs/xlsx.mini.min.js",
	"js/libs/tmx-parser.js",
	"js/libs/test.js",
	"js/rmmz_core.js",
    "js/rmmz_managers.js",
    "js/rmmz_objects.js",
    "js/rmmz_scenes.js",
    "js/rmmz_sprites.js",
    "js/rmmz_windows.js",
    "js/plugins.js"
];
const nyaUrls = [
	"js/nya/nya_rebuild.js",
	"js/nya/nya_base.js",
	"js/nya/nya_physics.js",
	"js/nya/nya_statem.js",
	"js/nya/nya_game.js",
	"js/nya/nya_map.js",
	"js/nya/nya_map_layer.js",
	"js/nya/nya_preload.js",
	"js/nya/nya_package.js",
	"js/nya/nya_config.js",
	"js/nya/nya_event_trigger.js",
	"js/nya/nya_ui.js",
	"js/nya/nya_achieves.js",
	"js/nya/nya_game_system.js",
	"js/nya/nya_iframe.js",
	"js/nya/nya_statem_ext.js",
	"js/nya/nya_effect.js",
	"js/nya/nya_tilemap.js",
	"js/nya/nya_external.js",
	"js/nya/nya_storage.js",
	"js/nya/nya_ai.js",
	"js/nya/nya_patch.js"];
const workerUrls = [
	"js/nya_workers/nya_storage_worker.js"
];
const nyaNWBinUrl = 'js/nya.min.bin';
const nyaUrl = 'js/nya.min.js';
const effekseerWasmUrl = "js/libs/effekseer.wasm";

class Main {
    constructor() {
        this.xhrSucceeded = false;
        this.loadCount = 0;
        this.error = null;
		this.workers = {};
    }
	
	cjs() {
		return 0x47c4451cad7f121b;
	}
	
	cjs2() {
		return 0xff6b1764dffab4c1;
	}
	
	x(u8, o = 0) {
		const cjs = this.cjs();
		for(let i = 0; i < u8.length; i++) {
			u8[i] = this.remc(i + o, cjs, u8[i]);
		}
	}
	
	y(u8) {
		const cjs = this.cjs2();
		for(let i = 0; i < u8.length; i++) {
			u8[i] = this.remc(i, cjs, u8[i]);
		} 
		return u8;
	}
	
	remc(i, j, k) {
		const i1 = 0x5f5a617 % (i + 1);
		const i2 = i1 % 0x10;
		const i3 = i2 * 4;
		const i4 = 0xf << i3;
		const i5 = i4 & j;
		const i6 = i5 >> i3;
		return k ^ i6;
	}

    run() {
		this.showLoadingSpinner();
        this.vacScript();
    }
	
	vac(arc) {
		arc = arc || this.getArc();
		let steamfiles = [];
		if(arc === "ia32") {
			steamfiles = steamfiles.concat(["lib/greenworks-win32.node", "lib/sdkencryptedappticket.dll", "lib/steam_api.dll"]);
		}
		if(arc === "x64") {
			steamfiles = steamfiles.concat(["lib/greenworks-win64.node", "lib/sdkencryptedappticket64.dll", "lib/steam_api64.dll"]);
		}
		if(arc === "linux") {
			steamfiles = steamfiles.concat(["lib/greenworks-linux64.node", "lib/libsdkencryptedappticket.so", "lib/libsteam_api.so"]);
		}
		const files = ["greenworks.js", "index.html", "package.json", "readme.txt"];
		const fs = require('fs');
		const plugins = fs.readdirSync('js/plugins').map((name) => { return 'js/plugins/' + name; });
		const allScripts = scriptUrls.concat(steamfiles, files, plugins, workerUrls, [nyaNWBinUrl, effekseerWasmUrl]);
		return allScripts;
	}
	
	getArc() {
		if(typeof process === "object") {
			if(process.platform === "win32") {
				return process.arch;
			} else {
				return process.platform;
			}
		}
		return "";
	}
	
	vacScript() {
		if(!NYA.DEBUG && NYA.NWBIN) {
			const allScripts = this.vac();
			fetch("leader").then((response) => {
				return response.arrayBuffer();
			}).then((buffer) => {
				const u8 = new Uint8Array(buffer);
				this.x(u8);
				const utf8decoder = new TextDecoder();
				const leader = JSON.parse(utf8decoder.decode(u8));
				const checker = new Promise((resolve, reject) => {
					let checkCount = 0;
					for(const script of allScripts) {
						fetch(script).then((response) => {
							return response.text();
						}).then((txt) => {
							const scpmd5 = md5.compute(txt);
							if(leader[script] === scpmd5) {
								checkCount++;
								if(checkCount === allScripts.length) {
									resolve();
								}
							} else {
								reject("script file runtime error : " + script);
							}
						});
					}
				}).catch((code) => { this.nwWriteExitInfo(code); });
				checker.then(() => {
					this.requestGreenworks();
				});
			});
		} else {
			this.setDefaultLanguage();
			this.realRun();
		}
	}
	
	setDefaultLanguage() {
		window["$dataLanguage"] = "english";
	}
	
	steamAppId() {
		return NYA.STEAMAPPID;
	}
	
	demoSteamAppId() {
		return NYA.STEAMDEMOAPPID;
	}
	
	requestGreenworks() {
		this.greenworks();
		this.requestNwEnv();
		this.realRun();
	}
	
	greenworks() {
		try{
			window.greenworks = require("./greenworks");
		} catch(err) {
			this.nwWriteExitInfo("steam sdk module loading failed : " + err);
		}
		try{
			greenworks.init();
		} catch(err) {
			this.nwWriteExitInfo("steam sdk initialize failed : " + err);
		}
		if(!greenworks.isSteamRunning())
		{
			this.nwWriteExitInfo("steam is not running");
		}
		const steamAppId = greenworks.getAppId();
		const cerAppId = NYA.DEMO ? this.demoSteamAppId() : this.steamAppId();
		if(steamAppId != cerAppId)
		{
			this.nwWriteExitInfo("steam is not running");
		}
		if(!greenworks.isSubscribedApp(steamAppId))
		{
			this.nwWriteExitInfo("app is not be subscribed");
		}
		greenworks.on('steam-shutdown', function() {
			window.close();
		});
		window["$dataLanguage"] = greenworks.getCurrentGameLanguage();
	}
	
	requestNwEnv() {
		if(nw.process.versions['nw-flavor'] !== 'normal')
		{
			this.nwWriteExitInfo("nw version checking failed");
		}
		if(location.pathname !== '/index.html')
		{
			this.nwWriteExitInfo("document position checking failed");
		}
	}
	
	nwWriteExitInfo(info) {
		const fs = require('fs');
		fs.writeFileSync("nya_error.log", info);
		window.close();
		throw "assertion failed!";
	}
	
	realRun() {
        this.loadMainScripts();
	}

    showLoadingSpinner() {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        document.body.appendChild(loadingSpinner);
    }

    eraseLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
            document.body.removeChild(loadingSpinner);
        }
    }

    loadMainScripts() {
		let urls = scriptUrls;
		if(!NYA.NWBIN) {
			if(NYA.DEBUG) {
				urls = urls.concat(nyaUrls);
			}
			else {
				urls.push(nyaUrl);
			}
		}
		this.loadWorkers();
		for (const url of urls) {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			script.async = false;
			script.defer = true;
			script.onload = this.onScriptLoad.bind(this);
			script.onerror = this.onScriptError.bind(this);
			script._url = url;
			document.body.appendChild(script);
		}
		this.numScripts = urls.length;
		if(!NYA.NWBIN) {
			window.addEventListener("load", this.onWindowLoad.bind(this));
			window.addEventListener("error", this.onWindowError.bind(this));
		}
    }
	
	loadWorkers() {
		if(!NYA.DEBUG || typeof process === "undefined") {
			workerUrls.forEach(worker => {
				this.workers[worker] = new Worker(worker);
			});
		}
	}
	
	getWorker(name) {
		return this.workers[name];
	}

    onScriptLoad() {
        if (++this.loadCount === this.numScripts) {
			if(NYA.NWBIN) {
				nw.Window.get().evalNWBin(null, nyaNWBinUrl);
			}
            PluginManager.setup($plugins);
			if(NYA.NWBIN) {
				this.onWindowLoad();
			}
        }
    }

    onScriptError(e) {
        this.printError("Failed to load", e.target._url);
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        if (!document.getElementById("errorPrinter")) {
            const errorPrinter = document.createElement("div");
            errorPrinter.id = "errorPrinter";
            errorPrinter.innerHTML = this.makeErrorHtml(name, message);
            document.body.appendChild(errorPrinter);
			
			const errorPrinterImage = document.createElement("img");
			errorPrinterImage.id = "errorImage";
			errorPrinterImage.src = "icon/error.png";
			errorPrinter.style.width = "960px";
			errorPrinter.style.height = "100px";
			document.body.appendChild(errorPrinterImage);
        }
    }

    makeErrorHtml(_name, _message) {
		
		const nameDiv = document.createElement("div");
		const messageDiv = document.createElement("div");
		nameDiv.id = "errorName";
		messageDiv.id = "errorMessage";
		const name = TextManager["STATIC_TEXT_GAME_CRASH_TITLE"] || "游戏居然出错了";
		const message = TextManager["STATIC_TEXT_GAME_CRASH_CONTENT"] || "虽然作者想极力挽回但游戏还是不能继续正常工作了，真的非常抱歉！";
		nameDiv.innerHTML = Utils.escapeHtml(!_name ? "" : name);
		messageDiv.innerHTML = Utils.escapeHtml(!_message ? "" : message);
		return nameDiv.outerHTML + messageDiv.outerHTML;
    }

    onWindowLoad() {
        if (this.isPathRandomized()) {
            const message = "Please move the Game.app to a different folder.";
            this.printError("Error", message);
        } else if (this.error) {
            this.printError(this.error.name, this.error.message);
        } else {
            this.initEffekseerRuntime();
        }
    }

    onWindowError(event) {
        if (!this.error) {
            this.error = event.error;
        }
    }

    isPathRandomized() {
        // [Note] We cannot save the game properly when Gatekeeper Path
        //   Randomization is in effect.
        return (
            Utils.isNwjs() &&
            process.mainModule.filename.startsWith("/private/var")
        );
    }

    initEffekseerRuntime() {
        const onLoad = this.onEffekseerLoad.bind(this);
        const onError = this.onEffekseerError.bind(this);
        effekseer.initRuntime(effekseerWasmUrl, onLoad, onError);
    }

    onEffekseerLoad() {
        this.eraseLoadingSpinner();
        SceneManager.run(Scene_Boot);
    }

    onEffekseerError() {
        this.printError("Failed to load", effekseerWasmUrl);
    }
}

var md5 = md5 || {};
(function($){
	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}
	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}
	var F = function(x, y, z) {
		return (x & y) | ((~ x) & z);
	}
	var G = function(x, y, z) {
		return (x & z) | (y & (~ z));
	}
	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}
	var I = function(x, y, z) {
		return (y ^ (x | (~ z)));
	}
	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};
	var wordToHex = function(lValue) {
		var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
		}
		return WordToHexValue;
	};
	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
	$.compute = function(string) {
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
			string = uTF8Encode(string);
			x = convertToWordArray(string);
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			for (k = 0; k < x.length; k += 16) {
				AA = a; BB = b; CC = c; DD = d;
				a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
				b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
				b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
				a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
				d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
				c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
				c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
				a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
				d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
				c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
				a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
				a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
				b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
				d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
				a = addUnsigned(a, AA);
				b = addUnsigned(b, BB);
				c = addUnsigned(c, CC);
				d = addUnsigned(d, DD);
			}
			var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
			return tempValue.toLowerCase();
		}
})(md5);

const main = new Main();
if(!NYA.BUILD) {
	main.run();
} else {
	var module = module || {};
	main.md5 = md5;
	if(typeof exports !== "undefined") {
		exports = module.exports = main;
	}
}

//-----------------------------------------------------------------------------
