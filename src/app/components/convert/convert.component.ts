import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit {

  constructor(private convert: ConvertService) { }

  ngOnInit() {
    //this.convert.downloadAsync("UznHTBZIa8E");
  }

}
