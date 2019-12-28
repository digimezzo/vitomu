export enum ConvertState {
    WaitingForClipboardContent,
    HasValidClipboardContent,
    FFmpegNotFound,
    Converting,
    Successful,
    Failed
}