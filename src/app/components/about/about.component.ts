import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../core/constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  constructor() { }

  public applicationName: string = Constants.applicationName;

  ngOnInit() {
  }

}
