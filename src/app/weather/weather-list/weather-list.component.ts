import { Component, OnInit } from '@angular/core';
import { WeatherItemModel } from '../weather-item/weather-item-model';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
 weatherItems: WeatherItemModel[];
 constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.weatherItems = this.weatherService.getWeatherItems();
console.log(this.weatherItems);

  }
}