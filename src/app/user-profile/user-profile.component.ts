import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user;
  order: string = 'timestring';
  reverse: boolean = true;
  fetchingprofile:boolean = false;
  sortedCollection: any[];

  constructor(private orderPipe: OrderPipe,private http:HttpClient,private router:Router,private authService:AuthService,private toastr:ToastrService) { 
    
  }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if(token==null){
      this.toastr.error('@Contactto','Please login to view your profile.',{
        timeOut:2000,
        progressBar:true
      });
        this.router.navigate([''])
    }
    else{
      this.fetchingprofile = true;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })

      this.http.get(
        environment.backend_url+'/user/me',{
          headers:headers
        }).subscribe((responseData)=>{
         // console.log(responseData)  

          this.user = responseData;

          this.toastr.success('@Contactto','User profile fetched.',{
            timeOut:2000,
            progressBar:true
          });
          this.sortedCollection = this.orderPipe.transform(this.user.messagesent, 'timestring');
    },(error)=>{
      this.toastr.error('@Contactto','Some error ocured while fetching your profile.',{
        timeOut:2000,
        progressBar:true
      });
    })
    this.fetchingprofile = false;
    }
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
