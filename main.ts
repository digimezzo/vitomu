import { app, BrowserWindow, Menu, screen } from 'electron';
// Logging needs to be imported in main.ts also. Otherwise it just doesn't work anywhere else.
// See post by megahertz: https://github.com/megahertz/electron-log/issues/60
// "You need to import electron-log in the main process. Without it, electron-log doesn't works in a renderer process."
import log from 'electron-log';
import * as Store from 'electron-store';
import * as windowStateKeeper from 'electron-window-state';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';

app.commandLine.appendSwitch('disable-color-correct-rendering');

log.create('main');
log.transports.file.resolvePath = () => path.join(app.getPath('userData'), 'logs', 'Vitomu.log');

let win, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === '--serve');

// Workaround: Global does not allow setting custom properties.
// We need to cast it to "any" first.
const globalAny: any = global;

// Static folder is not detected correctly in production
if (process.env.NODE_ENV !== 'development') {
    globalAny.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

function createWindow(): void {
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    Menu.setApplicationMenu(null);

    // Load the previous state with fallback to defaults
    const windowState = windowStateKeeper({
        defaultWidth: 500,
        defaultHeight: 500,
    });

    // Create the window using the state information
    win = new BrowserWindow({
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

    globalAny.windowHasFrame = windowhasFrame();

    windowState.manage(win);

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
        });
        win.loadURL('http://localhost:4200');
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'dist/index.html'),
                protocol: 'file:',
                slashes: true,
            })
        );
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

function windowhasFrame(): boolean {
    const settings: Store<any> = new Store();

    if (!settings.has('useSystemTitleBar')) {
        if (os.platform() === 'win32') {
            settings.set('useSystemTitleBar', false);
        } else {
            settings.set('useSystemTitleBar', true);
        }
    }

    return settings.get('useSystemTitleBar');
}

try {
    log.info('[Main] [] +++ Starting +++');

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        log.info('[App] [window-all-closed] +++ Stopping +++');
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
} catch (e) {
    // Catch Error
    // throw e;
}
