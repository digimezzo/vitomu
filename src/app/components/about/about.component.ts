import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Constants } from '../../core/constants';
import { Desktop } from '../../core/desktop';
import { LicenseDialogComponent } from '../dialogs/license-dialog/license-dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  constructor(private dialog: MatDialog, private desktop: Desktop) { }

  public applicationVersion: string = Constants.applicationVersion;
  public applicationCopyright: string = Constants.applicationCopyright;
  public websiteUrl: string = Constants.websiteUrl;
  public twitterUrl: string = Constants.twitterUrl;
  public githubUrl: string = Constants.githubUrl;
  public externalComponents: any[] = Constants.externalComponents;

  public ngOnInit(): void {
  }

  public openLicenseDialog(): void {
    const dialogRef: MatDialogRef<LicenseDialogComponent> = this.dialog.open(LicenseDialogComponent, {
      width: '450px'
    });
  }

  public openDonateLink(): void {
    this.desktop.openLink(Constants.donateUrl);
  }
}
