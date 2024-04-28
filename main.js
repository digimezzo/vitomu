"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Logging needs to be imported in main.ts also. Otherwise it just doesn't work anywhere else.
// See post by megahertz: https://github.com/megahertz/electron-log/issues/60
// "You need to import electron-log in the main process. Without it, electron-log doesn't works in a renderer process."
const electron_log_1 = require("electron-log");
const Store = require("electron-store");
const windowStateKeeper = require("electron-window-state");
const os = require("os");
const path = require("path");
const url = require("url");
electron_1.app.commandLine.appendSwitch('disable-color-correct-rendering');
electron_log_1.default.create('main');
electron_log_1.default.transports.file.resolvePath = () => path.join(electron_1.app.getPath('userData'), 'logs', 'Vitomu.log');
let win, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === '--serve');
// Workaround: Global does not allow setting custom properties.
// We need to cast it to "any" first.
const globalAny = global;
// Static folder is not detected correctly in production
if (process.env.NODE_ENV !== 'development') {
    globalAny.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}
function createWindow() {
    const electronScreen = electron_1.screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;
    electron_1.Menu.setApplicationMenu(null);
    // Load the previous state with fallback to defaults
    const windowState = windowStateKeeper({
        defaultWidth: 500,
        defaultHeight: 500,
    });
    const remoteMain = require('@electron/remote/main');
    remoteMain.initialize();
    // Create the window using the state information
    win = new electron_1.BrowserWindow({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        backgroundColor: '#fff',
        frame: windowhasFrame(),
        icon: path.join(globalAny.__static, os.platform() === 'win32' ? 'icons/icon.ico' : 'icons/64x64.png'),
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
        show: false,
    });
    remoteMain.enable(win.webContents);
    globalAny.windowHasFrame = windowhasFrame();
    windowState.manage(win);
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
    if (serve) {
        // win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    // 'ready-to-show' doesn't fire on Windows in dev mode. In prod it seems to work.
    // See: https://github.com/electron/electron/issues/7779
    win.on('ready-to-show', () => {
        win.show();
        win.focus();
    });
    // Makes links open in external browser
    const handleRedirect = (e, link) => {
        // Check that the requested link is not the current page
        if (link !== win.webContents.getURL()) {
            e.preventDefault();
            require('electron').shell.openExternal(link);
        }
    };
    win.webContents.on('will-navigate', handleRedirect);
    win.webContents.on('new-window', handleRedirect);
    win.webContents.on('before-input-event', (event, input) => {
        if (input.key.toLowerCase() === 'f12') {
            // if (serve) {
            win.webContents.toggleDevTools();
            // }
            event.preventDefault();
        }
    });
}
function windowhasFrame() {
    const settings = new Store();
    if (!settings.has('useSystemTitleBar')) {
        if (os.platform() === 'win32') {
            settings.set('useSystemTitleBar', false);
        }
        else {
            settings.set('useSystemTitleBar', true);
        }
    }
    return settings.get('useSystemTitleBar');
}
try {
    electron_log_1.default.info('[Main] [] +++ Starting +++');
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
        electron_log_1.default.info('[App] [window-all-closed] +++ Stopping +++');
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map