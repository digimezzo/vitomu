"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.applicationName = require("../../../package.json").name;
    Constants.applicationVersion = require("../../../package.json").version;
    Constants.applicationCopyright = "Copyright Digimezzo Ⓒ 2017 - 2019";
    Constants.donateUrl = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MQALEWTEZ7HX8";
    Constants.websiteUrl = "https://www.digimezzo.com";
    Constants.twitterUrl = "https://twitter.com/digimezzo";
    Constants.githubUrl = "https://github.com/digimezzo";
    Constants.languages = [
        { code: "en", englishName: "English", localizedName: "English" },
        { code: "fr", englishName: "French", localizedName: "Français" },
        { code: "nl", englishName: "Dutch", localizedName: "Nederlands" }
    ];
    Constants.colorThemes = [
        { name: "default-pink-theme", displayName: "Pink", color: "#ec1a65" },
        { name: "default-green-theme", displayName: "Green", color: "#00b163" },
    ];
    Constants.audioFormats = [
        { id: "mp3", name: "MP3", ffmpegFormat: "mp3", extension: ".mp3" },
        { id: "flac", name: "FLAC", ffmpegFormat: "flac", extension: ".flac" },
        { id: "ogg", name: "Ogg Vorbis", ffmpegFormat: "ogg", extension: ".ogg" },
        { id: "m4a", name: "M4A", ffmpegFormat: "mp4", extension: ".m4a" },
        { id: "aac", name: "AAC", ffmpegFormat: "mp4", extension: ".aac" }
    ];
    Constants.audioBitrates = [32, 48, 56, 64, 96, 128, 160, 192, 224, 256, 320];
    Constants.externalComponents = [
        {
            name: "Angular",
            description: "Angular is a development platform for building mobile and desktop web applications using Typescript/JavaScript and other languages.",
            url: "https://angular.io/",
            licenseUrl: "https://github.com/angular/angular/blob/master/LICENSE"
        },
        {
            name: "Angular Material",
            description: "Component infrastructure and Material Design components for Angular.",
            url: "https://material.angular.io/",
            licenseUrl: "https://github.com/angular/material2/blob/master/LICENSE"
        },
        {
            name: "Electron",
            description: "The Electron framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS. It is based on Node.js and Chromium.",
            url: "https://electronjs.org/",
            licenseUrl: "https://github.com/electron/electron/blob/master/LICENSE"
        },
        {
            name: "electron-log",
            description: "Just a simple logging module for your Electron or NW.js application. No dependencies. No complicated configuration. Just require and use. It can be used without Electron.",
            url: "https://github.com/megahertz/electron-log",
            licenseUrl: "https://github.com/megahertz/electron-log/blob/master/LICENSE"
        },
        {
            name: "electron-store",
            description: "Simple data persistence for your Electron app or module. Save and load user preferences, app state, cache, etc.",
            url: "https://github.com/sindresorhus/electron-store",
            licenseUrl: "https://github.com/sindresorhus/electron-store/blob/master/license"
        },
        {
            name: "electron-window-state",
            description: "A library to store and restore window sizes and positions for your Electron app.",
            url: "https://github.com/mawie81/electron-window-state",
            licenseUrl: "https://github.com/mawie81/electron-window-state/blob/master/license"
        },
        {
            name: "ffbinaries downloader",
            description: "Downloads precompiled ffmpeg, ffprobe, ffplay and ffserver binaries from ffbinaries.com.",
            url: "https://github.com/vot/ffbinaries-node",
            licenseUrl: "https://github.com/vot/ffbinaries-node"
        },
        {
            name: "Fluent ffmpeg-API for node.js",
            description: "This library abstracts the complex command-line usage of ffmpeg into a fluent, easy to use node.js module.",
            url: "https://github.com/fluent-ffmpeg/node-fluent-ffmpeg",
            licenseUrl: "https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/blob/master/LICENSE"
        },
        {
            name: "fs-extra",
            description: "Adds file system methods that aren't included in the native fs module and adds promise support to the fs methods.",
            url: "https://github.com/jprichardson/node-fs-extra",
            licenseUrl: "https://github.com/jprichardson/node-fs-extra/blob/master/LICENSE"
        },
        {
            name: "Line Awesome",
            description: "Line Awesome is a free alternative for Font Awesome.",
            url: "https://github.com/icons8/line-awesome",
            licenseUrl: "https://github.com/icons8/line-awesome/blob/master/LICENSE.md"
        },
        {
            name: "Material Design icons",
            description: "Material Design icons by Google.",
            url: "https://github.com/google/material-design-icons",
            licenseUrl: "https://github.com/google/material-design-icons/blob/master/LICENSE"
        },
        {
            name: "node-ytdl-core",
            description: "Yet another youtube downloading module. Written with only Javascript and a node-friendly streaming interface.",
            url: "https://github.com/fent/node-ytdl-core",
            licenseUrl: "https://github.com/fent/node-ytdl-core/blob/master/LICENSE"
        },
        {
            name: "progress-stream",
            description: "Read the progress of a stream. Supports speed and eta.",
            url: "https://github.com/freeall/progress-stream",
            licenseUrl: "https://github.com/freeall/progress-stream/blob/master/LICENSE"
        },
        {
            name: "sanitize-filename",
            description: "Sanitize a string to be safe for use as a filename by removing directory paths and invalid characters.",
            url: "https://github.com/parshap/node-sanitize-filename",
            licenseUrl: "https://github.com/parshap/node-sanitize-filename/blob/master/LICENSE.md"
        }
    ];
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map