import { Component } from '@angular/core';

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

  clicked($event:any):void{
    console.log($event)
    this.title='see you tomorrow';
  }
}
