const { getFullVersion } = require('./get-package-information.js');

const config = {
    appId: 'com.vitomu.dopamine',
    productName: 'Vitomu',
    snap: {
        base: 'core22', // Must match build server (currently Ubuntu 22.04)
        grade: 'stable',
        confinement: 'strict',
        summary: 'Easy to use video to audio converter.',
        description:
            'Vitomu stands for VIdeo TO MUsic converter. It allows easy conversion of online and offline videos to audio files.',
        plugs: [
            // REQUIRED for Electron desktop apps
            'desktop',
            'desktop-legacy',
            'wayland',
            'x11',
            'unity7',
            'opengl',
            'audio-playback',
            'browser-support',
            'network',
            'network-bind',
            'gsettings',
            'screen-inhibit-control',

            // File access
            'home',
            'removable-media',
        ],
    },
    nsis: {
        shortcutName: 'Vitomu',
        perMachine: false,
        oneClick: false,
        deleteAppDataOnUninstall: false,
        allowToChangeInstallationDirectory: true,
        allowElevation: true,
        include: 'build/uninstaller.nsh',
        installerSidebar: 'build/Sidebar.bmp',
        uninstallerSidebar: 'build/Sidebar.bmp',
    },
    directories: {
        output: 'release',
    },
    files: ['**/*'],
    extraResources: ['LICENSE'],
    win: {
        target: ['nsis'],
        artifactName: `\${productName}-${getFullVersion()}.\${ext}`,
    },
    mac: {
        target: ['dmg'],
        artifactName: `\${productName}-${getFullVersion()}.\${ext}`,
        identity: '-',
    },
    linux: {
        target: ['AppImage', 'deb', 'rpm', 'pacman', 'snap'],
        category: 'Audio',
        artifactName: `\${productName}-${getFullVersion()}.\${ext}`,
        synopsis: 'Easy to use video to audio converter.',
        description:
            'Vitomu stands for VIdeo TO MUsic converter. It allows easy conversion of online and offline videos to audio files.',
    },
    pacman: {
        // Use Arch package names explicitly so Ubuntu-built artifacts
        // do not leak distro-specific auto-detected dependencies.
        depends: ['gtk3', 'libnotify', 'nss', 'libxss', 'libxtst', 'xdg-utils', 'at-spi2-core'],
    },
};

module.exports = config;
