import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductInformation } from '../../common/application/product-information';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';
import { UpdateService } from '../../services/update/update.service';
import { AnimatedPage } from '../animated-page';
import { PromiseUtils } from '../../common/utils/promise-utils';
import { enterLeftToRight, enterRightToLeft } from '../../animations/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [enterLeftToRight, enterRightToLeft],
})
export class HomeComponent extends AnimatedPage implements OnInit {
    constructor(
        public appearanceService: BaseAppearanceService,
        public productInformation: ProductInformation,
        private updateService: UpdateService
    ) {
        super();
        this.page = 0;
    }

    public ngOnInit(): void {
        PromiseUtils.noAwait(this.updateService.checkForUpdatesAsync());
    }
}
