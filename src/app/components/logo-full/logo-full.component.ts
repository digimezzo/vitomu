import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductInformation } from '../../common/application/product-information';

@Component({
    selector: 'app-logo-full',
    host: { style: 'display: block' },
    templateUrl: './logo-full.component.html',
    styleUrls: ['./logo-full.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LogoFullComponent implements OnInit {
    constructor(public productInformation: ProductInformation) {}

    @Input() public textColor: string;

    public ngOnInit(): void {}
}
