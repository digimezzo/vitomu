import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Constants } from '../../common/application/constants';
import { ProductInformation } from '../../common/application/product-information';
import { Desktop } from '../../common/io/desktop';
import { LicenseDialogComponent } from '../dialogs/license-dialog/license-dialog.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
    constructor(public productInformation: ProductInformation, private dialog: MatDialog, private desktop: Desktop) {}
    public websiteUrl: string = Constants.websiteUrl;
    public twitterUrl: string = Constants.twitterUrl;
    public githubUrl: string = Constants.githubUrl;
    public externalComponents: any[] = Constants.externalComponents;

    public ngOnInit(): void {}

    public openLicenseDialog(): void {
        const dialogRef: MatDialogRef<LicenseDialogComponent> = this.dialog.open(LicenseDialogComponent, {
            width: '450px',
        });
    }

    public openDonateLink(): void {
        this.desktop.openLink(Constants.donateUrl);
    }
}
