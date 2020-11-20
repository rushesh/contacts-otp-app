import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contacts-add',
  templateUrl: './contacts-add.component.html',
  styleUrls: ['./contacts-add.component.css']
})
export class ContactsAddComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private authService:AuthService,private toastr:ToastrService) { }

  ngOnInit() {
    let token = localStorage.getItem("token")
    // console.log("Token "+token)
    if(token!=null){
    }
    else{
      this.toastr.info('@Contactto','Please login to continue.',{
        timeOut:2000,
        progressBar:true
      });
      this.router.navigate(['/login'])
    }
  }
  onSubmit(form : NgForm,event){
    
    const fname = form.value.userdata.fname
    const lname = form.value.userdata.lname
    const number = form.value.userdata.number
    const contact = {
      fname,lname,number
    }
    let token = localStorage.getItem("token")
    // console.log("Token "+token)
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    this.http.post(
      environment.backend_url+'/contact',contact,{
        headers:headers
      }).subscribe((responseData)=>{
        //console.log(responseData)
        if(responseData["_id"]){
          // this.authService.login()
          // sessionStorage.setItem("token",responseData["token"].toString())
          this.toastr.success('@Contactto','Contact added successfully.',{
            timeOut:2000,
            progressBar:true
          });
          this.router.navigate(['/contacts'])
        }
      },
      (error)=>{
        //console.log(error)
  if( error.error.msg)
  {
    this.toastr.error('@Contactto','Duplicate Number. '+ error.error.msg,{
      timeOut:2500,
      enableHtml:true,
      progressBar:true
    });

  }
  else{
    this.toastr.error('@Contactto','Error occured while saving your contact. '+ error.error.msg,{
      timeOut:2500,
      enableHtml:true,
      progressBar:true
    });

  }
        this.router.navigate(['/contacts'])
      })
  } catch (error) {
      this.router.navigate(['/'])
  }

}
