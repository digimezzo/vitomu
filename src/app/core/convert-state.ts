export enum ConvertState {
    WaitingForClipboardContent,
    HasValidClipboardContent,
    ffmpegNotAvailable,
    downloadingFfmpeg,
    youtubeDlNotAvailable,
    downloadingYoutubeDl,
    ConversionInProgress,
    ConversionSuccessful,
    ConversionFailed,
}
