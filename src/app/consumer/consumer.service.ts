import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http:HttpClient) { }

  getAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>('/api/consumers')
  }

  search(query:string):Observable<Consumer[]>{
    return this.http.get<Consumer[]>(`/api/consumers?q=${query}`)
  }

  getById(id: number): Observable<Consumer>{
    return this.http.get<Consumer>(`/api/consumers/${id}`);
  }

  record(consumer:Consumer): Observable<Consumer>{
    if(consumer.id){
      return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer)
    }else{
      return this.http.post<Consumer>('/api/consumers', consumer)
    }
  }
  delete(id:number):Observable<Object>{
    return this.http.delete(`/api/consumers/${id}`)
  }
}
