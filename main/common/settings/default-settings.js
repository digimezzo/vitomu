"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SETTINGS = void 0;
var os = require("os");
exports.DEFAULT_SETTINGS = {
    language: 'en',
    checkForUpdates: true,
    audioFormat: 'mp3',
    audioBitrate: 320,
    useSystemTitleBar: os.platform() !== 'win32',
    fontSize: 13,
    followSystemTheme: false,
    useLightBackgroundTheme: false,
    followSystemColor: false,
    theme: 'Vitomu',
};
//# sourceMappingURL=default-settings.js.map