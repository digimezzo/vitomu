"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsStore = void 0;
var electron_1 = require("electron");
var fs = require("fs-extra");
var path = require("path");
var default_settings_1 = require("./default-settings");
var SETTINGS_FILE = path.join(electron_1.app.getPath('userData'), 'config.json');
var SettingsStore = /** @class */ (function () {
    function SettingsStore() {
        this.data = {};
        this.load();
        this.applyDefaults();
    }
    SettingsStore.prototype.get = function (key) {
        return this.data[key];
    };
    SettingsStore.prototype.set = function (key, value) {
        this.data[key] = value;
        this.save();
    };
    SettingsStore.prototype.getAll = function () {
        return __assign({}, this.data);
    };
    SettingsStore.prototype.load = function () {
        try {
            if (fs.existsSync(SETTINGS_FILE)) {
                var content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
                if (content.trim().length > 0) {
                    this.data = JSON.parse(content);
                }
            }
        }
        catch (err) {
            console.error('Failed to load settings:', err);
            this.data = {};
        }
    };
    SettingsStore.prototype.applyDefaults = function () {
        var changed = false;
        for (var _i = 0, _a = Object.entries(default_settings_1.DEFAULT_SETTINGS); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], defaultValue = _b[1];
            if (!(key in this.data)) {
                this.data[key] = defaultValue;
                changed = true;
            }
        }
        if (changed) {
            this.save();
        }
    };
    SettingsStore.prototype.save = function () {
        try {
            var tmpPath = SETTINGS_FILE + '.tmp';
            fs.writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), 'utf-8');
            fs.renameSync(tmpPath, SETTINGS_FILE);
        }
        catch (err) {
            console.error('Failed to save settings:', err);
        }
    };
    return SettingsStore;
}());
exports.SettingsStore = SettingsStore;
//# sourceMappingURL=settings-store.js.map