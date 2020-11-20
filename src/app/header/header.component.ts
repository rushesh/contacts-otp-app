import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscription: any;

  constructor(private http: HttpClient, private router:Router,private authService:AuthService,private toastr:ToastrService) { }
  loggedInState: Observable<boolean>; 
  log;
  ngOnInit() {
    // localStorage.clear()
    // sessionStorage.clear()
    // get the current value
    this.loggedInState = this.authService.loggedIn;
    //this.log = this.authService.loggedIn.value;
    this.loggedInState.subscribe((val)=>{
      // console.log("Value "+ val)
      this.log = val
    })
  }
  onLogout(){
    let token = localStorage.getItem("token")
    // console.log("Token "+token)
    if(token!=null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

     this.http.post(environment.backend_url+"/user/logout",{headers: headers}).subscribe((res)=>{
      
  },
  (error)=>{
    // console.log("error : "+error)
  })
  this.toastr.info('@Contactto','You are logged out!',{
    timeOut:2000,
    progressBar:true
  });
  this.authService.logout()
  }
  else{
    this.toastr.info('@Contactto','You are not logged in',{
      timeOut:2000,
      progressBar:true
    });
    this.router.navigate(['/'])
  }
}
  onLogoutAll(){
    let token = localStorage.getItem("token")
    // console.log("Token "+token)
    
    if(token!=null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

     this.http.post(environment.backend_url+'/user/logoutall',{headers: headers}).subscribe((res)=>{
      this.toastr.info('@Contactto','You are logged out!',{
        timeOut:2000,
        progressBar:true
      });
  },
  (error)=>{
    // console.log("Error : "+error)
  })
  this.toastr.info('@Contactto','You are logged out!',{
    timeOut:2000,
    progressBar:true
  });

  this.authService.logout()
  }
  else{
    this.toastr.info('@Contactto','You are not logged in',{
      timeOut:2000,
      progressBar:true
    });
    this.router.navigate(['/'])
  }
  }

}
