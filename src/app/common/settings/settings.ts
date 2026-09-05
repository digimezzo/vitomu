import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BaseSettings } from './base-settings';

@Injectable()
export class Settings implements BaseSettings {
    private cache = new Map<string, any>();

    constructor() {
        const allSettings = ipcRenderer.sendSync('settings:getAll');
        Object.entries(allSettings).forEach(([key, value]) => this.cache.set(key, value));
    }

    // Default language
    public get defaultLanguage(): string {
        return 'en';
    }

    // Language
    public get language(): string {
        return this.get('language');
    }

    public set language(v: string) {
        this.set('language', v);
    }

    // Audio format
    public get audioFormat(): string {
        return this.get('audioFormat');
    }

    public set audioFormat(v: string) {
        this.set('audioFormat', v);
    }

    // Bitrate
    public get audioBitrate(): number {
        return this.get('audioBitrate');
    }

    public set audioBitrate(v: number) {
        this.set('audioBitrate', v);
    }

    // Check for updates
    public get checkForUpdates(): boolean {
        return this.get('checkForUpdates');
    }

    public set checkForUpdates(v: boolean) {
        this.set('checkForUpdates', v);
    }

    // System title bar
    public get useSystemTitleBar(): boolean {
        return this.get('useSystemTitleBar');
    }

    public set useSystemTitleBar(v: boolean) {
        this.set('useSystemTitleBar', v);
    }

    // FontSize
    public get fontSize(): number {
        return this.get('fontSize');
    }

    public set fontSize(v: number) {
        this.set('fontSize', v);
    }

    // Theme
    public get theme(): string {
        return this.get('theme');
    }

    public set theme(v: string) {
        this.set('theme', v);
    }

    // Follow system theme
    public get followSystemTheme(): boolean {
        return this.get('followSystemTheme');
    }

    public set followSystemTheme(v: boolean) {
        this.set('followSystemTheme', v);
    }

    // Use light background theme
    public get useLightBackgroundTheme(): boolean {
        return this.get('useLightBackgroundTheme');
    }

    public set useLightBackgroundTheme(v: boolean) {
        this.set('useLightBackgroundTheme', v);
    }

    // Follow system color
    public get followSystemColor(): boolean {
        return this.get('followSystemColor');
    }

    public set followSystemColor(v: boolean) {
        this.set('followSystemColor', v);
    }

    private get<T>(key: string): T {
        return this.cache.get(key);
    }

    private set<T>(key: string, value: T): void {
        this.cache.set(key, value);
        ipcRenderer.sendSync('settings:set', key, value);
    }
}
