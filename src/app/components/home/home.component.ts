import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductInformation } from '../../common/application/product-information';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';
import { UpdateService } from '../../services/update/update.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    constructor(
        public appearanceService: BaseAppearanceService,
        public productInformation: ProductInformation,
        private updateService: UpdateService
    ) {}

    public ngOnInit(): void {
        // Check for updates (don't await)
        this.updateService.checkForUpdatesAsync();
    }
}
