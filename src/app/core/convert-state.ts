export enum ConvertState {
    WaitingForClipboardContent,
    HasValidClipboardContent,
    PrerequisitesNotOK,
    FixingPrerequisites,
    ConversionInProgress,
    ConversionSuccessful,
    ConversionFailed
}
