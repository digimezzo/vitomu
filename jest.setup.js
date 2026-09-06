jest.mock('@electron/remote', () => ({
    app: {
        getPath: jest.fn(() => '/tmp/vitomu'),
    },
    getCurrentWindow: jest.fn(() => ({
        close: jest.fn(),
        isMaximized: jest.fn(() => false),
        maximize: jest.fn(),
        minimize: jest.fn(),
        unmaximize: jest.fn(),
    })),
    getGlobal: jest.fn(),
    nativeTheme: {
        on: jest.fn(),
        shouldUseDarkColors: true,
    },
    process: {
        argv: [],
    },
    shell: {
        openExternal: jest.fn(),
        openPath: jest.fn(),
        showItemInFolder: jest.fn(),
    },
    systemPreferences: {
        getAccentColor: jest.fn(() => '#000000'),
        on: jest.fn(),
    },
}));