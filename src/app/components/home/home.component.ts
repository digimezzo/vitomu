import { Component, OnInit } from '@angular/core';
import { Constants } from '../../core/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public applicationName: string = Constants.applicationName;

  ngOnInit() {
  }

}
