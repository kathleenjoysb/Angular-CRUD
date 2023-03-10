import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs/operators' //please check this out
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _refreshRequired = new Subject<void>;
  
  get Refreshrequired(){
    return this._refreshRequired;
  }
  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>("http://localhost:3000/posts", data) // the links are only a dummy json server. You can change it if you want to.
    .pipe(map((res:any)=>{
      return res;
    }),
  tap(()=>{ 
      this._refreshRequired.next();
    }),
  )
  }

  
  getUser(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUser(data : any, id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }),
    tap(value => console.log(value))
  )}

  deleteUser(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // getData(id: number) {return this.http.get<any>(`${this.appData},/${id}`)}
  getData(id: number) {return this.http.get<any>("http://localhost:3000/posts/"+id)}

}
