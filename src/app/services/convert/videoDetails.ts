import * as ytdl from 'ytdl-core';

export class VideoDetails {
    private fileNameReplacements = [[/"/g, ""], [/'/g, ""], [/\//g, ""], [/\?/g, ""], [/:/g, ""], [/;/g, ""]];

    private _videoTitle: string;
    private _artist: string;
    private _title: string;
    private _thumbnail: string;

    constructor(videoInfo: ytdl.videoInfo) {
        this._videoTitle = this.cleanFileName(videoInfo.player_response.videoDetails.title);
        this._thumbnail = videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url || null;
        this._artist = "Unknown";
        this._title = "Unknown";

        if (this._videoTitle.indexOf('-') > -1) {
            let pieces: string[] = this._videoTitle.split('-');

            if (pieces.length >= 2) {
                this._artist = pieces[0].trim();
                this._title = pieces[1].trim();
            }
        } else {
            this._title = this._videoTitle;
        }

        if (videoInfo.author && videoInfo.author.name) {
            this._artist = videoInfo.author.name;
        }
    }

    public get videoTitle(): string {
        return this._videoTitle;
    }

    public get artist(): string {
        return this._artist;
    }

    public get title(): string {
        return this._title;
    }

    public get thumbnail(): string {
        return this._thumbnail;
    }

    private cleanFileName(fileName: string): string {
        let cleanedFileName: string = fileName;

        this.fileNameReplacements.forEach((replacement: string[]) => {
            cleanedFileName = cleanedFileName.replace(replacement[0], replacement[1]);
        });

        return cleanedFileName;
    }
}