import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { DemoObservableService } from '../common/demo-observable.service';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  observable?: Observable<number>;

  private subs: Subscription[]=[];

  constructor(private demoObservable : DemoObservableService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub=>sub.unsubscribe());
  }

  testObservable():void{
    this.subs.push(this.demoObservable.test().pipe(
      map(x=>x*10),
      take(2)
    ).subscribe({
        next: (data:number)=>{ console.log(data)},
        error: (error:Error)=>{console.error(error)},
        complete: ()=>{console.log('finished')}
      }));
  }
  observableToTemplate():void{
    this.observable = this.demoObservable.test()
  }
}
