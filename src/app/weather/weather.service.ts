import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherItemModel } from './weather-item/weather-item-model';
import { WEATHER_ITEMS } from './weather-item/weather-item.data';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WeatherService
{
  constructor(private http: HttpClient){}
  getWeatherItems = (): WeatherItemModel[] => {
      return WEATHER_ITEMS;
  }
  addWeatherItem(weatherItem: WeatherItemModel): void {
    if (!this.checkIfAlreadyExists(weatherItem.cityName)){
    WEATHER_ITEMS.push(weatherItem);
    }
  }
  clearWeatherItems(): void {
    WEATHER_ITEMS.splice(0);
  }

  checkIfAlreadyExists(cityName): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < WEATHER_ITEMS.length; i++){
      if (WEATHER_ITEMS[i].cityName.toLocaleLowerCase() === cityName.toLocaleLowerCase()){
        return true;
      }

      if (i === WEATHER_ITEMS.length){
        return false;
      }
    }
  }
  getCityWeather(cityName: string): Observable<any>{
    console.log(environment.backend_url_weatherapp +'/getlatestweather?address=' + encodeURIComponent(cityName));

    return this.http.get(environment.backend_url_weatherapp +'/getlatestweather?address=' + encodeURIComponent(cityName)).pipe(map(
    (response) => response));
  }
}