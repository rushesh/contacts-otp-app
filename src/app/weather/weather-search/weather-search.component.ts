import { Component, OnInit } from "@angular/core";

import { NgForm } from "@angular/forms";

import { Subject } from "rxjs";

import { WeatherItemModel } from "../weather-item/weather-item-model";

import { WeatherService } from "../weather.service";

import { switchMap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-weather-search",

  templateUrl: "./weather-search.component.html",

  styleUrls: ["./weather-search.component.css"],
})
export class WeatherSearchComponent implements OnInit {
  private searchStream = new Subject<string>();

  data: any = {};

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchStream

      .pipe(debounceTime(500))

      .pipe(distinctUntilChanged())

      .pipe(
        switchMap((input: string) => this.weatherService.getCityWeather(input))
      )

      .subscribe(
        (data) => {
          this.data = data;
          console.log(this.data);
          this.toastr.success("@WeatherApp", "City Found. " + this.data.location+".", {
            timeOut: 2000,
            progressBar: true,
          });
        },
        (error) => {
          //console.log(error);
          this.toastr.error(
            "@WeatherApp",
            "Some error occured while fetching nearest location. ",
            {
              timeOut: 2000,
              progressBar: true,
            }
          );
        }
      );
  }

  onSubmit(f: NgForm): void {
    console.log(this.data);
    if (f.status.toLocaleLowerCase() === "valid") {
      if (
        this.data.location !== null &&
        this.data.location !== undefined &&
        this.data.location.toString().trim() !== ""
      ) {
          console.log(this.data);
          
        const weatherItem = new WeatherItemModel(
          this.data.location,
          this.data.forecast,
          this.data.temperature,
          this.data.feelsliketemp
        );
        console.log(weatherItem);
        
        this.weatherService.addWeatherItem(weatherItem);
        this.toastr.success(
          "@WeatherApp",
          "City added. " + this.data.location,
          {
            timeOut: 2000,
            progressBar: true,
          }
        );
      } else {
        //console.log(' Data is - else ' + this.data);
        this.toastr.warning(
          "@WeatherApp",
          "No City to Add. Searching for a nearby match.",
          {
            timeOut: 2000,
            progressBar: true,
          }
        );
      }
    }
  }

  onSearchLocation(cityinput): any {
    if (
      cityinput == null ||
      cityinput === undefined ||
      cityinput.trim() === ""
    ) {
      //console.log('Empty');

      this.data = {};
      this.toastr.info("@WeatherApp", "No City Provided.", {
        timeOut: 2000,
        progressBar: true,
      });
    } else {
      this.searchStream.next(cityinput);
    }
  }
}
