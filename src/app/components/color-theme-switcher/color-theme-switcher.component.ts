import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColorTheme } from '../../common/color-theme';
import { AppearanceService } from '../../services/appearance/appearance.service';

@Component({
    selector: 'app-color-theme-switcher',
    host: { style: 'display: block' },
    templateUrl: './color-theme-switcher.component.html',
    styleUrls: ['./color-theme-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ColorThemeSwitcherComponent implements OnInit {
    constructor(public appearance: AppearanceService) {}

    public ngOnInit(): void {}

    public setColorTheme(colorTheme: ColorTheme): void {
        this.appearance.selectedColorTheme = colorTheme;
    }
}
