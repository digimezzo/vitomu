import { FontSize } from '../../services/appearance/theme/font-size';
import { Language } from '../../services/appearance/theme/language';
import { AudioFormat } from '../audio-format';

export class Constants {
    public static readonly logFileName: string = 'Vitomu.log';

    public static readonly applicationName: string = require('../../../../package.json').name;
    public static readonly applicationVersion: string = require('../../../../package.json').version;
    public static readonly applicationCopyright: string = 'Copyright Digimezzo Ⓒ 2017 - 2021';
    public static readonly donateUrl: string = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MQALEWTEZ7HX8';
    public static readonly websiteUrl: string = 'https://www.digimezzo.com';
    public static readonly twitterUrl: string = 'https://twitter.com/digimezzo';
    public static readonly githubUrl: string = 'https://github.com/digimezzo';

    public static readonly languages: Language[] = [
        new Language('en', 'English', 'English'),
        new Language('fr', 'French', 'Français'),
        new Language('nl', 'Dutch', 'Nederlands'),
    ];

    public static readonly fontSizes: FontSize[] = [new FontSize(13), new FontSize(14), new FontSize(15)];

    public static readonly audioFormats: AudioFormat[] = [
        new AudioFormat('mp3', 'MP3', 'mp3', '.mp3'),
        new AudioFormat('flac', 'FLAC', 'flac', '.flac'),
        new AudioFormat('ogg', 'Ogg Vorbis', 'ogg', '.ogg'),
        new AudioFormat('m4a', 'M4A', 'mp4', '.m4a'),
        new AudioFormat('aac', 'AAC', 'mp4', '.aac'),
    ];

    public static readonly audioBitrates: number[] = [32, 48, 56, 64, 96, 128, 160, 192, 224, 256, 320];

    public static readonly youtubeLinks: string[] = ['www.youtube.com/watch?v=', 'youtu.be/'];

    public static readonly externalComponents: any[] = [
        {
            name: 'Angular',
            description:
                'Angular is a development platform for building mobile and desktop web applications using Typescript/JavaScript and other languages.',
            url: 'https://angular.io/',
            licenseUrl: 'https://github.com/angular/angular/blob/master/LICENSE',
        },
        {
            name: 'Angular Material',
            description: 'Component infrastructure and Material Design components for Angular.',
            url: 'https://material.angular.io/',
            licenseUrl: 'https://github.com/angular/material2/blob/master/LICENSE',
        },
        {
            name: 'command-exists-promise',
            description: 'Node module to check if a command-line command exists.',
            url: 'https://github.com/raftario/command-exists',
            licenseUrl: 'https://github.com/raftario/command-exists/blob/master/LICENSE',
        },
        {
            name: 'Electron',
            description:
                'The Electron framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS. It is based on Node.js and Chromium.',
            url: 'https://electronjs.org/',
            licenseUrl: 'https://github.com/electron/electron/blob/master/LICENSE',
        },
        {
            name: 'electron-log',
            description:
                'Just a simple logging module for your Electron or NW.js application. No dependencies. No complicated configuration. Just require and use. It can be used without Electron.',
            url: 'https://github.com/megahertz/electron-log',
            licenseUrl: 'https://github.com/megahertz/electron-log/blob/master/LICENSE',
        },
        {
            name: 'electron-store',
            description: 'Simple data persistence for your Electron app or module. Save and load user preferences, app state, cache, etc.',
            url: 'https://github.com/sindresorhus/electron-store',
            licenseUrl: 'https://github.com/sindresorhus/electron-store/blob/master/license',
        },
        {
            name: 'electron-window-state',
            description: 'A library to store and restore window sizes and positions for your Electron app.',
            url: 'https://github.com/mawie81/electron-window-state',
            licenseUrl: 'https://github.com/mawie81/electron-window-state/blob/master/license',
        },
        {
            name: 'emoji-strip',
            description: 'Use emoji-regex to Strip emoji from a string in Node.js and browsers.',
            url: 'https://github.com/nizaroni/emoji-strip',
            licenseUrl: 'https://github.com/nizaroni/emoji-strip/blob/master/LICENSE',
        },
        {
            name: 'ffbinaries downloader',
            description: 'Downloads precompiled ffmpeg, ffprobe, ffplay and ffserver binaries from ffbinaries.com.',
            url: 'https://github.com/vot/ffbinaries-node',
            licenseUrl: 'https://github.com/vot/ffbinaries-node',
        },
        {
            name: 'FFmpeg',
            description:
                'FFmpeg is the leading multimedia framework, able to decode, encode, transcode, mux, demux, stream, filter and play pretty much anything that humans and machines have created.',
            url: 'http://www.ffmpeg.org/',
            licenseUrl: 'https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html',
        },
        {
            name: 'fs-extra',
            description:
                "Adds file system methods that aren't included in the native fs module and adds promise support to the fs methods.",
            url: 'https://github.com/jprichardson/node-fs-extra',
            licenseUrl: 'https://github.com/jprichardson/node-fs-extra/blob/master/LICENSE',
        },
        {
            name: 'Line Awesome',
            description: 'Line Awesome is a free alternative for Font Awesome.',
            url: 'https://github.com/icons8/line-awesome',
            licenseUrl: 'https://github.com/icons8/line-awesome/blob/master/LICENSE.md',
        },
        {
            name: 'Material Design icons',
            description: 'Material Design icons by Google.',
            url: 'https://github.com/google/material-design-icons',
            licenseUrl: 'https://github.com/google/material-design-icons/blob/master/LICENSE',
        },
        {
            name: 'node-downloader-helper',
            description: 'A simple http file downloader for node.js.',
            url: 'https://github.com/hgouveia/node-downloader-helper',
            licenseUrl: 'https://github.com/hgouveia/node-downloader-helper/blob/master/LICENSE',
        },
        {
            name: 'progress-stream',
            description: 'Read the progress of a stream. Supports speed and eta.',
            url: 'https://github.com/freeall/progress-stream',
            licenseUrl: 'https://github.com/freeall/progress-stream/blob/master/LICENSE',
        },
        {
            name: 'sanitize-filename',
            description: 'Sanitize a string to be safe for use as a filename by removing directory paths and invalid characters.',
            url: 'https://github.com/parshap/node-sanitize-filename',
            licenseUrl: 'https://github.com/parshap/node-sanitize-filename/blob/master/LICENSE.md',
        },
        {
            name: 'TinyColor',
            description:
                'TinyColor is a small, fast library for color manipulation and conversion in JavaScript. It allows many forms of input, while providing color conversions and other color utility functions. It has no dependencies.',
            url: 'https://github.com/bgrins/TinyColor',
            licenseUrl: 'https://github.com/bgrins/TinyColor/blob/master/LICENSE',
        },
        {
            name: 'yt-dlp',
            description: 'A youtube-dl fork with additional features and fixes.',
            url: 'https://github.com/yt-dlp/yt-dlp',
            licenseUrl: 'https://github.com/yt-dlp/yt-dlp/blob/master/LICENSE',
        },
    ];
}
