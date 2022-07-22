import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-form',
  templateUrl: './consumer-form.component.html',
  styleUrls: ['./consumer-form.component.scss']
})
export class ConsumerFormComponent implements OnInit {

  consumerForm: FormGroup;
  private subs: Subscription[]= [];

  constructor(private consumerService: ConsumerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.consumerForm = new FormGroup({
      id: new FormControl(),
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    })
   }

  ngOnInit(): void {
    this.subs.push(this.activatedRoute.params.subscribe({
      next: (params:Params)=>{
        const id:number = params['id'];
        this.subs.push(this.consumerService.getById(id).subscribe({
          next:(data:Consumer)=>{this.consumerForm.patchValue(data)},
          error: (error)=>{console.error(error)},
          complete: ()=>{}
        }))
      },
      error: (error)=>{console.log(error)},
      complete: ()=>{}
    }));
  }

  validate():void{
    this.subs.push(this.consumerService.record(this.consumerForm.value).subscribe({
      next: (data:Consumer)=>{this.router.navigateByUrl('/consumers')},
      error: (error)=>{console.error(error)},
      complete: ()=>{}
    }))
  }
  cancel():void{
    this.router.navigateByUrl('/consumers');
  }
}
