import { Language } from "./language";
import { ColorTheme } from "./colorTheme";

export class Constants {
    static readonly applicationName: string = require("../../../package.json").name;
    static readonly applicationVersion: string = require("../../../package.json").version;
    static readonly applicationCopyright: string = "Copyright Digimezzo Ⓒ 2017 - 2019";
    static readonly donateUrl = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MQALEWTEZ7HX8";
    static readonly websiteUrl = "https://www.digimezzo.com";
    static readonly twitterUrl = "https://twitter.com/digimezzo";
    static readonly githubUrl = "https://github.com/digimezzo";

    static readonly languages: Language[] = [
        { code: "en", englishName: "English", localizedName: "English" },
        { code: "fr", englishName: "French", localizedName: "Français" },
        { code: "nl", englishName: "Dutch", localizedName: "Nederlands" }
    ];

    static readonly colorThemes: ColorTheme[] = [
        { name: "default-pink-theme", displayName: "Pink", color: "#ec1a65" },
        { name: "default-green-theme", displayName: "Green", color: "#00b163" },
    ];

    static readonly externalComponents: any[] = [
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
            name: "Font Awesome Free",
            description: "The iconic SVG, font, and CSS toolkit.",
            url: "https://github.com/FortAwesome/Font-Awesome",
            licenseUrl: "https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt"
        },
        {
            name: "fs-extra",
            description: "Adds file system methods that aren't included in the native fs module and adds promise support to the fs methods.",
            url: "https://github.com/jprichardson/node-fs-extra",
            licenseUrl: "https://github.com/jprichardson/node-fs-extra/blob/master/LICENSE"
        },
        {
            name: "Material Design icons",
            description: "Material Design icons by Google.",
            url: "https://github.com/google/material-design-icons",
            licenseUrl: "https://github.com/google/material-design-icons/blob/master/LICENSE"
        }
    ];
}