import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_KEY = 'angularcrm.user_key'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user?: User;

  constructor() {
    if(sessionStorage.getItem(USER_KEY)){
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
    }
   }

   get authenticated():boolean{
    return !!this.user;
   }

   disconnect():void{
    sessionStorage.clear();
    this.user = undefined;
   }

  authentUser(login:string, password: string):User{
    this.user = {
      id:1,
      login:login,
      lastname: 'Doe',
      firstname: 'John'
    };
    sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
    return this.user;
  }
}
