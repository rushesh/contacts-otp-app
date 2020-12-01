import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform/loginform.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ContactsAddComponent } from './contacts-add/contacts-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SentMessagesComponent } from './sent-messages/sent-messages.component';
import { OrderModule } from 'ngx-order-pipe';
import { SidebarComponent } from './weather/sidebar/sidebar.component';
import { WeatherItemComponent } from './weather/weather-item/weather-item.component';
import { WeatherSearchComponent } from './weather/weather-search/weather-search.component';
import { WeatherListComponent } from './weather/weather-list/weather-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    ContactsComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    ContactsAddComponent,
    UserProfileComponent,
    SentMessagesComponent,
    SidebarComponent,
    WeatherItemComponent,
    WeatherSearchComponent,
    WeatherListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations mo,dule
    ToastrModule.forRoot(), // ToastrModule added
    OrderModule
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
