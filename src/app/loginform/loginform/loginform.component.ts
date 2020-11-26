import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginform:boolean = false;
  constructor(private http: HttpClient, private router:Router,private authService:AuthService,private toastr:ToastrService) { }
  ngOnInit() {
    this.loginform = false;
    let token = localStorage.getItem('token')
    if(token!=null){
      this.toastr.warning('@Contactto','You are already logged in',{
        timeOut:2000,
        progressBar:true
      });
        this.router.navigate([''])
    }
  }
  onSubmit(form : NgForm){
      const email = form.value.userdata.email
      const password = form.value.userdata.password
      const user = {
        email,password
      }
      try {
        this.loginform = true;
        this.http.post(
          environment.backend_url+'/user/login',user).subscribe((responseData)=>{
            
            if(responseData["token"]){
              localStorage.setItem("token",responseData["token"].toString())
              // console.log("Token Login  : "+localStorage.getItem("token"))
              this.authService.login()
              this.toastr.success('@Contactto','You are logged in.',{
                timeOut:2000,
                progressBar:true
              });
              this.router.navigate(['/'])
            }
          },
          (error)=>{
            Swal.fire({
              title: 'Error while logging you.',
              text: "Password or Email is incorrect",
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Goto Home'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/'])  
                //this.router.navigate(['/login'])  
              }
            })
          },()=>{
            this.loginform = false;
          })
          
      } catch (error) {
          this.router.navigate(['/'])
      }
   
  }
}
