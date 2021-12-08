import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../common/constants';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';
import { UpdateService } from '../../services/update/update.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    constructor(public appearanceService: BaseAppearanceService, private updateService: UpdateService) {}

    public applicationName: string = Constants.applicationName;

    public ngOnInit(): void {
        // Check for updates (don't await)
        this.updateService.checkForUpdatesAsync();
    }
}
