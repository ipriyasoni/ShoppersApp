import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }
 
  canActivate(){
    return this.authService.user$.pipe(
      map(user => {
        if(user){
          //user is logged in so user should not see login page
          this.router.navigate(['/']);
          return false;
        }else{
          //user is not logged in so user can see login page
          return true;
        }
      })
    );
  }
}