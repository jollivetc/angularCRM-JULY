import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit {

  consumers: Consumer[] = [];
  query: string=''

  constructor(private consumerService: ConsumerService) { }

  ngOnInit(): void {
   this.consumerService.getAllConsumers().subscribe({
      next: (data)=>{this.consumers=data},
      error: (error)=> {console.error(error)},
      complete:()=>{}
   })
  }

  search():void{
    this.consumerService.search(this.query).subscribe({
      next: (data)=>{this.consumers=data},
      error: (error)=> {console.error(error)},
      complete:()=>{}
    })
  }
}
