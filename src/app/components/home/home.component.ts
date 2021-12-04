import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../common/constants';
import { AppearanceService } from '../../services/appearance/appearance.service';
import { UpdateService } from '../../services/update/update.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    constructor(public appearance: AppearanceService, private update: UpdateService) {}

    public applicationName: string = Constants.applicationName;

    public ngOnInit(): void {
        // Check for updates (don't await)
        this.update.checkForUpdatesAsync();
    }
}
