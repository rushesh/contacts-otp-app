import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})
export class ContactsService
{
    constructor(private http: HttpClient){}
    getContacts(userToken): Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          })
      
           return this.http.get(environment.backend_url+ "/contact",{headers: headers});
          
    }
}