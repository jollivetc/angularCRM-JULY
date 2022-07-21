import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm : FormGroup;
  loginErrorMessage={
    required : 'it is required',
    minlength: 'it is too short'
  }
  private subs: Subscription[]=[];

  constructor(private authent: AuthenticationService, private router:Router) {
    this.authent.disconnect();
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password : new FormControl('',[Validators.required, checkPassword])
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  onSubmit():void{
    const subscription: Subscription = this.authent.authentUser(
        this.loginForm.value.login,
        this.loginForm.value.password
      ).subscribe({
        next:(user:User)=>{this.router.navigateByUrl('/home')},
        error: (error:Error)=>{alert('error on login')},
        complete: ()=>{}
      });
    this.subs.push(subscription)
  }
}

function checkPassword(c:AbstractControl): ValidationErrors | null{
  if((c.value as string).indexOf('$') < 0){
    return null
  }else{
    return { checkPassword: 'there is a $'}
  }
}

