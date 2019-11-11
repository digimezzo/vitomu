import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../core/constants';
import { ConvertService } from '../../services/convert/convert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private convert: ConvertService) { }

  public applicationName: string = Constants.applicationName;
  
  ngOnInit() {
    this.convert.initialize();
  }
}
