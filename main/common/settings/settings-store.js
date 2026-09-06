"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsStore = void 0;
const electron_1 = require("electron");
const fs = require("fs-extra");
const path = require("path");
const default_settings_1 = require("./default-settings");
const SETTINGS_FILE = path.join(electron_1.app.getPath('userData'), 'config.json');
class SettingsStore {
    constructor() {
        this.data = {};
        this.load();
        this.applyDefaults();
    }
    get(key) {
        return this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
        this.save();
    }
    getAll() {
        return Object.assign({}, this.data);
    }
    load() {
        try {
            if (fs.existsSync(SETTINGS_FILE)) {
                const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
                if (content.trim().length > 0) {
                    this.data = JSON.parse(content);
                }
            }
        }
        catch (err) {
            console.error('Failed to load settings:', err);
            this.data = {};
        }
    }
    applyDefaults() {
        let changed = false;
        for (const [key, defaultValue] of Object.entries(default_settings_1.DEFAULT_SETTINGS)) {
            if (!(key in this.data)) {
                this.data[key] = defaultValue;
                changed = true;
            }
        }
        if (changed) {
            this.save();
        }
    }
    save() {
        try {
            const tmpPath = SETTINGS_FILE + '.tmp';
            fs.writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), 'utf-8');
            fs.renameSync(tmpPath, SETTINGS_FILE);
        }
        catch (err) {
            console.error('Failed to save settings:', err);
        }
    }
}
exports.SettingsStore = SettingsStore;
//# sourceMappingURL=settings-store.js.map