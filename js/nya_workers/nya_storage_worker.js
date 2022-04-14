//-----------------------------------------------------------------------------
// StorageManager
//
// The static class that manages storage for saving game data.

function StorageManager() {
    throw new Error("This is a static class");
}

StorageManager._gameId = 0;
StorageManager.saveObject = function(saveName, json) {
    return this.jsonToZip(json)
        .then(zip => this.saveZip(saveName, zip));
};

StorageManager.jsonToZip = function(json) {
    return new Promise((resolve, reject) => {
        try {
            const zip = pako.deflate(json);
            resolve(zip);
        } catch (e) {
            reject(e);
        }
    });
};

StorageManager.saveZip = function(saveName, zip) {
    if (this.isLocalMode()) {
        return this.saveToLocalFile(saveName, zip);
    } else {
        return this.saveToForage(saveName, zip);
    }
};

StorageManager.exists = function(saveName) {
    return this.localFileExists(saveName);
};

StorageManager.remove = function(saveName) {
    return this.removeLocalFile(saveName);
};

StorageManager.saveToLocalFile = function(saveName, zip) {
    const dirPath = this.fileDirectoryPath();
    const filePath = this.filePath(saveName);
    const backupFilePath = filePath + "_";
    return new Promise((resolve, reject) => {
        this.fsMkdir(dirPath);
        this.fsUnlink(backupFilePath);
        this.fsRename(filePath, backupFilePath);
        try {
            this.fsWriteFile(filePath, zip);
            this.fsUnlink(backupFilePath);
            resolve();
        } catch (e) {
            try {
                this.fsUnlink(filePath);
                this.fsRename(backupFilePath, filePath);
            } catch (e2) {
                //
            }
            reject(e);
        }
    });
};

StorageManager.localFileExists = function(saveName) {
    const fs = require("fs");
    return fs.existsSync(this.filePath(saveName));
};

StorageManager.removeLocalFile = function(saveName) {
    this.fsUnlink(this.filePath(saveName));
};

StorageManager.fsMkdir = function(path) {
    const fs = require("fs");
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

StorageManager.fsRename = function(oldPath, newPath) {
    const fs = require("fs");
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
    }
};

StorageManager.fsUnlink = function(path) {
    const fs = require("fs");
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

StorageManager.fsReadFile = function(path) {
    const fs = require("fs");
    if (fs.existsSync(path)) {
		const buffer = fs.readFileSync(path);
		const dec = new TextDecoder();
        return dec.decode(main.y(new Uint8Array(buffer.buffer)));
    } else {
        return null;
    }
};

StorageManager.fsWriteFile = function(path, data) {
    const fs = require("fs");
    fs.writeFileSync(path, main.y(data));
};

StorageManager.fileDirectoryPath = function() {
    const path = require("path");
    const base = path.dirname(path.dirname(path.dirname(process.mainModule.filename)));
    return path.join(base, "save/");
};

StorageManager.filePath = function(saveName) {
    const dir = this.fileDirectoryPath();
    return dir + saveName + ".rmmzsave";
};

StorageManager.isLocalMode = function() {
	return typeof require === "function" && typeof process === "object";
};

StorageManager.saveToForage = function(saveName, zip) {
    const key = this.forageKey(saveName);
    const testKey = this.forageTestKey();
    setTimeout(() => localforage.removeItem(testKey));
    return localforage
        .setItem(testKey, zip)
        .then(() => localforage.setItem(key, zip))
        .then(() => this.updateForageKeys());
};

StorageManager.forageKey = function(saveName) {
    const gameId = this._gameId;
    return "rmmzsave." + gameId + "." + saveName;
};

StorageManager.forageTestKey = function() {
    return "rmmzsave.test";
};

StorageManager.updateForageKeys = function() {
    return localforage.keys().then(keys => {
        postMessage({method:"updateForageKeysDirect", args:[keys]});
        return 0;
    });
};

//-----------------------------------------------------------------------------


(() => {
	this.onmessage = function(e) {
		const method = e.data.method;
		const args = e.data.args;
		this[method](...args);
	};
})();

function autoSaveGame(saveName, globalInfo, contents) {
	StorageManager.saveObject(saveName, contents).then(() => {
        StorageManager.saveObject("global", globalInfo);
    });
}

function autoSaveGameWithOutGlobal(saveName, contents) {
	StorageManager.saveObject(saveName, contents);
}

function startWorking(isNWBin) {
	this.NYA = {};
	NYA.BUILD = true;
	this.importScripts("../libs/pako.min.js");
	this.importScripts("../libs/localforage.min.js");
	if(isNWBin) {
		fetch("../main.bin").then((response) => {
			return response.arrayBuffer();
		}).then((buffer) => {
			importNWBin(buffer);
		});
	} else {
		this.importScripts("../main.js");
	}
};

function setGameId(gameId) {
	StorageManager._gameId = gameId;
};




