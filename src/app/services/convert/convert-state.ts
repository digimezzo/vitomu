export enum ConvertState {
    Unknown,
    WaitingForClipboardContent,
    HasValidClipboardContent,
    FFmpegNotFound,
    DownloadingFFmpeg,
    Converting,
    Successful,
    Failed
}
