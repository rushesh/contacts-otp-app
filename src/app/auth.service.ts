import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, of } from "rxjs";

export class AuthService{
    loggedIn  = new BehaviorSubject(false); 
    token ;
    
    login(){
        this.loggedIn.next(true); 
        
        this.token = localStorage.getItem('token')
        //console.log(this.token, this.loggedIn)
        return this.loggedIn.asObservable();
    }
    logout(){
        this.loggedIn.next(false);
        localStorage.clear()
    }
    
    getLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
  }

}
