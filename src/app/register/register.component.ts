import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private authService:AuthService,private toastr:ToastrService) { }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if(token!=null){
      this.toastr.warning('@Contactto','You are already logged in. Please logout to register.',{
        timeOut:2000,
        progressBar:true
      });
        this.router.navigate([''])
    }
  }
  onSubmit(form : NgForm,event){
    
      const email = form.value.userdata.email
      const password = form.value.userdata.password
      const age = form.value.userdata.age
      const name = form.value.userdata.name
      const user = {
        email,password,age,name
      }
      this.http.post(
        environment.backend_url+'/user',user).subscribe((responseData)=>{
          // console.log(responseData)
          if(responseData["token"]){
            // this.authService.login()
            // sessionStorage.setItem("token",responseData["token"].toString())
            this.toastr.success('@Contactto','You are registered successfully. Please login to continue.',{
              timeOut:2000,
              progressBar:true
            });
            this.router.navigate(['/login'])
          }
          else{
            this.authService.logout()
            this.router.navigate(['/'])
          }
        },
        (error)=>{
          Swal.fire({
            title: 'Error while registering you.',
            text: "Please try again after sometime",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Goto Home'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/'])  
              //this.router.navigate(['/login'])  
            }
          })
        })
    } catch (error) {
        this.router.navigate(['/'])
    }


}