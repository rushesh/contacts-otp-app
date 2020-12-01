import { Injectable } from "@angular/core";

import { Profile } from "./profile";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private profiles: Profile[] = [
    new Profile("Default Profile", ["New York", "London", "Berlin"]),
  ];
  saveNewProfile(cities: string[]): any {
    let pname = "";
    cities.forEach((element) => {
      pname = "-" + pname;
      pname += element.substring(0, 1);
    });

    const profileName = "Profile " + pname;

    const profile = new Profile(profileName, cities);

    this.profiles.push(profile);
  }

  getProfiles(): any {
    return this.profiles;
  }

  deleteProfile(profile: Profile): void {
    this.profiles.splice(this.profiles.indexOf(profile), 1);
  }
}
