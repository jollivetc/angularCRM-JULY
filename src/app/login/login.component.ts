import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  loginErrorMessage={
    required : 'it is required',
    minlength: 'it is too short'
  }

  constructor(private authent: AuthenticationService) {
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password : new FormControl('',[Validators.required, checkPassword])
    })
   }

  ngOnInit(): void {
  }

  onSubmit():void{
    const user = this.authent.authentUser(
        this.loginForm.value.login,
        this.loginForm.value.password
    );
    console.log(user);
  }
}

function checkPassword(c:AbstractControl): ValidationErrors | null{
  if((c.value as string).indexOf('$') < 0){
    return null
  }else{
    return { checkPassword: 'there is a $'}
  }
}

