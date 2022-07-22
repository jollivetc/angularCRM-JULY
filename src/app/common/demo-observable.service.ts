import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoObservableService {

  constructor() {
   }

  test():Observable<number>{
    return new Observable<number>(
      (subscriber: Subscriber<number>)=>{
        setTimeout(()=>{subscriber.next(1)}, 1000);
        setTimeout(()=>{subscriber.next(2)}, 2000);
        setTimeout(()=>{subscriber.next(3)}, 3000);
        setTimeout(()=>{subscriber.complete()}, 4000);
      }
    );
  }
}
