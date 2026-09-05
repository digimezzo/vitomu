import { app } from 'electron';
import * as fs from 'fs-extra';
import * as path from 'path';
import { DEFAULT_SETTINGS } from './default-settings';

const SETTINGS_FILE = path.join(app.getPath('userData'), 'config.json');

export class SettingsStore {
    private data: Record<string, any> = {};

    public constructor() {
        this.load();
        this.applyDefaults();
    }

    public get<T = any>(key: string): T {
        return this.data[key] as T;
    }

    public set<T = any>(key: string, value: T): void {
        this.data[key] = value;
        this.save();
    }

    public getAll(): Record<string, any> {
        return { ...this.data };
    }

    private load(): void {
        try {
            if (fs.existsSync(SETTINGS_FILE)) {
                const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');

                if (content.trim().length > 0) {
                    this.data = JSON.parse(content);
                }
            }
        } catch (err) {
            console.error('Failed to load settings:', err);
            this.data = {};
        }
    }

    private applyDefaults(): void {
        let changed = false;

        for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
            if (!(key in this.data)) {
                this.data[key] = defaultValue;
                changed = true;
            }
        }

        if (changed) {
            this.save();
        }
    }

    private save(): void {
        try {
            const tmpPath = SETTINGS_FILE + '.tmp';
            fs.writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), 'utf-8');
            fs.renameSync(tmpPath, SETTINGS_FILE);
        } catch (err) {
            console.error('Failed to save settings:', err);
        }
    }
}