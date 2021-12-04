export enum ConvertState {
    WaitingForClipboardContent,
    HasValidClipboardContent,
    ffmpegNotAvailable,
    downloadingFfmpeg,
    youtubeDownloaderNotAvailable,
    downloadingYoutubeDownloader,
    ConversionInProgress,
    ConversionSuccessful,
    ConversionFailed,
}
