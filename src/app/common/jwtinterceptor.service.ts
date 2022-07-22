import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class JWTInterceptorService {

  constructor(private authent: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const jwtToken= this.authent.jwtToken;

    const clone= req.clone({setHeaders:{Authorization: `Bearer ${jwtToken}`}});
    return next.handle(clone);
  }
}
