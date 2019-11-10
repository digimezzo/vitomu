import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../core/constants';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LicenseDialogComponent } from '../dialogs/license-dialog/license-dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  public applicationVersion: string = Constants.applicationVersion;
  public applicationCopyright: string = Constants.applicationCopyright;

  ngOnInit() {
  }

  public openLicenseDialog(): void {
    let dialogRef: MatDialogRef<LicenseDialogComponent> = this.dialog.open(LicenseDialogComponent, {
      width: '450px'
    });
  }
}
