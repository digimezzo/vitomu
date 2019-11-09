import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslatorService } from '../../services/translator/translator.service';

@Component({
  selector: 'app-language-switcher',
  host: { 'style': 'display: block' },
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(public translator: TranslatorService) { }

  ngOnInit() {
  }
}
