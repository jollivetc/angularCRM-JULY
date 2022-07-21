import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './model/user';

const USER_KEY = 'angularcrm.user_key'
const TOKEN_KEY = 'angularcrm.token_key'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?: User;
  private token?: string;

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem(USER_KEY)){
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
      this.token = sessionStorage.getItem(TOKEN_KEY)!;
    }
   }

   get jwtToken(): string | undefined{
    return this.token;
   }

   get authenticated():boolean{
    return !!this.user;
   }

   disconnect():void{
    sessionStorage.clear();
    this.user = undefined;
    this.token = undefined;
   }

  authentUser(login:string, password: string):Observable<User>{
    return this.http.post<AuthenticationResponse>('/api/auth/login', {email: login, password:password})
      .pipe(
        map((data:AuthenticationResponse)=>{
          this.user = data.user;
          this.token = data.token;

          sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
          sessionStorage.setItem(TOKEN_KEY, this.token);

          return this.user;
        })
      )
  }
}

interface AuthenticationResponse {
  user:User,
  token: string
}
