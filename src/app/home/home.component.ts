import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr:ToastrService,private router:Router) { }

  ngOnInit() { 
    // this.toastr.success('@Contactto','Welcome',{
    //   timeOut:2000,
    //   progressBar:true
    // });
  }
  redirect(){
    this.router.navigate(['/contacts'])
  }

}
