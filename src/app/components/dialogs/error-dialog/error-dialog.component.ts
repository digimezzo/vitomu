import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../../common/application/constants';
import { Desktop } from '../../../common/io/desktop';
import { FileSystem } from '../../../common/io/file-system';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ErrorDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ErrorDialogComponent>,
        private desktop: Desktop,
        private fileSystem: FileSystem
    ) {
        this.dialogRef.disableClose = true;
    }

    public ngOnInit(): void {}

    public viewLog(): void {
        // See: https://stackoverflow.com/questions/30381450/open-external-file-with-electron
        this.desktop.showFileInDirectory(
            this.fileSystem.combinePath([this.fileSystem.applicationDataDirectory(), 'logs', Constants.logFileName])
        );
    }
}
