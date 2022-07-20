import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  fruits = ['apple','banana', 'pear','cherry'];
  person = {
    firstname:'Bob',
    lastname:'Morane',
    age:33
  }
  cssClass = 'red';
  email='myemail.com'

  clicked($event:any):void{
    console.log($event)
    this.title='see you tomorrow';
  }

  registerUser(signupForm :NgForm){
    console.log(`the email is ${this.email}`)
    console.log(signupForm.value)
    this.email = "toto";
  }
}
