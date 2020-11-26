import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { ContactsService } from './contacts.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  contacts: any = [];
  message: string;
  modalRef: BsModalRef;
  loadingContacts: boolean = false;
  
  order: string = 'number';
  reverse: boolean = false;
  
  sortedCollection: any[];

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard:false
  };
  clickedContact: any;
  otp : any;
  constructor(private contactService:ContactsService,private orderPipe: OrderPipe,private http: HttpClient,private modalService: BsModalService,private router:Router,private toastr:ToastrService) { }

   ngOnInit(): void {
     this.loadingContacts = true;
    //console.log(this.contacts)
    const that = this;
    let token = localStorage.getItem("token")
    //console.log("Token "+token)
    if(token!=null){

     this.contactService.getContacts(token).subscribe((contacts)=>{
     this.contacts = contacts;
    //console.log(this.contacts)
     if(this.contacts==undefined || this.contacts==null || this.contacts == [])
      {
        this.contacts = []
      }
      // console.log(this.contacts)
      if(this.contacts.length<=0){
        this.toastr.info('@Contactto','No Contacts Found.',{
          timeOut:3500,
          progressBar:true,
          progressAnimation:'decreasing'
        });
        this.toastr.warning('@Contactto','Please Add Contacts.',{
          timeOut:3500,
          progressBar:true
        });
      }
      this.sortedCollection = this.orderPipe.transform(this.contacts, 'number');
      this.loadingContacts = false;
    }
    )
  }
  else{
    this.toastr.info('@Contactto','Please login to continue.',{
      timeOut:2000,
      progressBar:true
    });
    this.router.navigate(['/login'])
  }
  // console.log(this.contacts);
}

   tableClicked(contact,template){
    //  console.log(contact);
     this.clickedContact = contact;
     this.otp = Math.floor(100000 + Math.random() * 900000)     
     this.modalRef = this.modalService.show(template, this.config);

   }
   confirm(clickedContact,otp) {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    // console.log(clickedContact,otp)

    let token = localStorage.getItem("token")
    // console.log("Token "+token)
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  otp = "Your OTP is : "+otp;
  
    const msg = {
      clickedContact,otp
    }
  // console.log(msg)
    this.http.post(
      environment.backend_url+"/user/sendmessage",msg,{
        headers:headers
      }).subscribe((responseData: any)=>{
        //console.log(responseData)  
        if(responseData.error){
          this.toastr.error('@Contactto','Some error ocured while sending OTP. ' + responseData.error,{
            timeOut:2000,
            progressBar:true
          });
        }
        else{
          this.toastr.success('@Contactto','OTP sent successfully.',{
            timeOut:2000,
            progressBar:true
          });
        }
  },(error)=>{
    this.toastr.warning('@Contactto','Some error ocured while sending OTP.',{
      timeOut:2000,
      progressBar:true
    });
  })
}
setOrder(value: string) {
  if (this.order === value) {
    this.reverse = !this.reverse;
  }
  this.order = value;
}
}