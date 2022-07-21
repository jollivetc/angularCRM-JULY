import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';

  handle($event:string):void{
    console.log($event);
  }
  handle2($event:string):void{
    console.log($event);
  }
}
