import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseConvertService } from '../../services/convert/base-convert.service';

@Component({
    selector: 'app-audio-bitrate-switcher',
    host: { style: 'display: block' },
    templateUrl: './audio-bitrate-switcher.component.html',
    styleUrls: ['./audio-bitrate-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AudioBitrateSwitcherComponent implements OnInit {
    constructor(public convertService: BaseConvertService) {}

    public ngOnInit(): void {}
}
