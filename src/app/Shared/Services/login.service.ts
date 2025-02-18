import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:any = environment.apiURL;
  constructor(private http:HttpClient) { }

  SendLogin(data:any)
  {
    let headers = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded","No-Auth":"True"}); 
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers.set('No-Auth','True');
    var formdata="email="+data.Email+"&password="+data.Password+"&grant_type=password"; //{Username : data.Username, Password:data.Password, grant_type:'password'}
    return this.http.post(this.url+'token',formdata,{headers: headers});
  }
}
