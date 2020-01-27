export enum ConvertState {
    Unknown,
    WaitingForClipboardContent,
    HasValidClipboardContent,
    DownloadingFFmpeg,
    Converting,
    Successful,
    Failed
}
