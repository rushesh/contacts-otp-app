import { Component, Input, OnInit } from '@angular/core';
import { WeatherItemModel } from './weather-item-model';
@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() weatherItem: WeatherItemModel;
  constructor() {  }
  ngOnInit(): void {
  }
}