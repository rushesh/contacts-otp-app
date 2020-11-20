import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { ContactsAddComponent } from './contacts-add/contacts-add.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { LoginformComponent } from './loginform/loginform/loginform.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'addcontact',component:ContactsAddComponent},
  {path:'login',component:LoginformComponent},
  {path:'register',component:RegisterComponent},
  {path:'userprofile',component:UserProfileComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
