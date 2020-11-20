import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private authService: AuthService, private router :Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
        
        // this.authService.getLoggedIn().subscribe((val)=>{
        //     if(val){
        //         return true
        //     }
        //     else{
        //         return false
        //         this.router.navigate([''])
        //     }
        // })

            return this.authService.loggedIn.pipe(map(user=>{
                console.log("User : "+user)
                if (user) {
                    return user;
                  }
                  else{ 
                    this.router.navigate(['/']);
                  }
                  
            }))
    }
}