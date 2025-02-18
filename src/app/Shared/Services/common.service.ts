import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  GetTaxList(){
    return this.http.get(environment.apiURL +'/Tax').toPromise();
  }

  SetItem(data:any){
    localStorage.setItem(data.name,data.value);
  }
  getItem(data:any){
    return localStorage.getItem(data);
  }
  RemoveItem(data:any){
    localStorage.removeItem(data);
  }
}
