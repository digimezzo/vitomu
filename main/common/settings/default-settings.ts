import * as os from 'os';

export const DEFAULT_SETTINGS = {
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