import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-form',
  templateUrl: './consumer-form.component.html',
  styleUrls: ['./consumer-form.component.scss']
})
export class ConsumerFormComponent implements OnInit {

  consumerForm: FormGroup;

  constructor(private consumerService: ConsumerService, private router: Router) {
    this.consumerForm = new FormGroup({
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
  }

  validate():void{
    this.consumerService.record(this.consumerForm.value).subscribe({
      next: (data:Consumer)=>{console.log(data);this.router.navigateByUrl('/consumers')},
      error: (error)=>{console.error(error)},
      complete: ()=>{}
    })
  }
  cancel():void{
    this.router.navigateByUrl('/consumers');
  }
}
