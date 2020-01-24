import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';

@Component({
  selector: 'app-audio-format-switcher',
  host: { 'style': 'display: block' },
  templateUrl: './audio-format-switcher.component.html',
  styleUrls: ['./audio-format-switcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AudioFormatSwitcherComponent implements OnInit {

  constructor(public convert: ConvertService) { }

  public ngOnInit(): void {
  }
}
