export enum ConvertState {
    WaitingForClipboardContent,
    HasValidClipboardContent,
    ffmpegNotAvailable,
    downloadingFfmpeg,
    youtubeDownloaderNotAvailable,
    downloadingYoutubeDownloader,
    updatingYoutubeDownloader,
    ConversionInProgress,
    ConversionSuccessful,
    ConversionFailed,
}
