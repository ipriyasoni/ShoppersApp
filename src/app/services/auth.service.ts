import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { UserService } from './user.service';
import { DbUser } from '../models/DbUser';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = afAuth.user;
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  //ask about this

  get dbUser$(): Observable<DbUser> {
    return this.user$.pipe(
      switchMap(user => {
        if(user){
          let uid = user.uid;
          return this.userService.getDbUser(uid).valueChanges(); //valueChanges == used for
        }else{
          return of(null);
        }
      })
     );
    }
  }

