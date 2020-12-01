import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Profile } from '../profile';

import { ProfileService } from '../profile.service';

import { WeatherItemModel } from '../weather-item/weather-item-model';

import { WeatherService } from '../weather.service';



@Component({

  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',

  styleUrls: ['./sidebar.component.css']

})

export class SidebarComponent implements OnInit {



  profiles: Profile[];

  previousProfile: Profile;

  constructor(private profileService: ProfileService, private weatherService: WeatherService, private toastr: ToastrService) { }



  ngOnInit(): void {

    this.profiles = this.profileService.getProfiles();

    this.previousProfile = new Profile('', []);

  }



  onSaveNewProfile(): any{

const cities = this.weatherService.getWeatherItems().map((element) => {

return element.cityName;

});

if(cities.length <= 0 ){
    this.toastr.error('@WeatherApp','No cities added to create new profile.',{
        timeOut:2000,
        progressBar:true
      });
    
}
else
{
this.profileService.saveNewProfile(cities);
this.toastr.success('@WeatherApp','New Profile Added.',{
    timeOut:2000,
    progressBar:true
  });
}
}

  onDeleteProfile($event, profile): any{
    this.profiles.splice(this.profiles.indexOf(profile), 1);
this.toastr.success('@WeatherApp','Profile deleted.',{
    timeOut:2000,
    progressBar:true
  });

  }

  onLoadProfile(profile: Profile): void{
    if (this.previousProfile.profileName.toLocaleLowerCase() === profile.profileName.toLocaleLowerCase()) {
this.toastr.info('@WeatherApp','Same Profile Selected '+profile.profileName,{
    timeOut:2000,
    progressBar:true
  });
    }

    else{

    this.previousProfile = profile;

    this.weatherService.clearWeatherItems();

    // tslint:disable-next-line:prefer-for-of

    for (let i = 0; i < profile.cities.length; i++) {
      if (!this.weatherService.checkIfAlreadyExists(profile.cities[i].toString())) {
      this.weatherService.getCityWeather(profile.cities[i]).subscribe(
        (data) => {
          if (data.location && !this.weatherService.checkIfAlreadyExists(data.location)){
          const weatherItem = new WeatherItemModel(data.location, data.forecast, data.temperature ,data.feelsliketemp);
          this.weatherService.addWeatherItem(weatherItem);
          }
        },(error)=>{
            //console.log(error)
            this.toastr.error('@WeatherApp','Some error occured.',{
                timeOut:2000,
                progressBar:true
              });
            
        }
        );
      }
    }
this.toastr.success('@WeatherApp','Weather Fetched.',{
    timeOut:2000,
    progressBar:true
  });

  }
  }
}