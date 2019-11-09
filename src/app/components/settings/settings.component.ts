import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslatorService } from '../../services/translator/translator.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {

  constructor(public translator: TranslatorService) { }

  ngOnInit() {
  }

}
