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
}