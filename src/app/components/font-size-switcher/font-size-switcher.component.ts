import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppearanceService } from '../../services/appearance/appearance.service';

@Component({
    selector: 'app-font-size-switcher',
    host: { style: 'display: block' },
    templateUrl: './font-size-switcher.component.html',
    styleUrls: ['./font-size-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FontSizeSwitcherComponent implements OnInit {
    constructor(public appearanceService: AppearanceService) {}

    public ngOnInit(): void {}
}
