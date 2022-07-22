import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit, OnDestroy {

  consumers: Consumer[] = [];
  query: string=''
  private subs:Subscription[]= [];

  constructor(private consumerService: ConsumerService) { }

  ngOnInit(): void {
   this.subs.push(this.consumerService.getAllConsumers().subscribe({
      next: (data)=>{this.consumers=data},
      error: (error)=> {console.error(error)},
      complete:()=>{}
   }));
  }
  ngOnDestroy(): void {
      this.subs.forEach(sub=>sub.unsubscribe());
  }

  search():void{
    this.subs.push(this.consumerService.search(this.query).subscribe({
      next: (data)=>{this.consumers=data},
      error: (error)=> {console.error(error)},
      complete:()=>{}
    }));
  }

  delete(id:number):void{
    this.subs.push(this.consumerService.delete(id).subscribe({
      next: (data:Object)=>{this.search()},
      error: (error)=>{console.error(error)},
      complete: ()=>{}
    }));
  }
}
