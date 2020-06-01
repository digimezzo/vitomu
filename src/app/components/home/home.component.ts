import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../core/constants';
import { AppearanceService } from '../../services/appearance/appearance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public appearance: AppearanceService) { }

  public applicationName: string = Constants.applicationName;

  public ngOnInit(): void {
  }
}
