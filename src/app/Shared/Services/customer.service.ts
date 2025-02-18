import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../Model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  GetCustomerList(){
    return this.http.get(environment.apiURL+'/Customer').toPromise();
   }

   AddOrUpdateCustomer(cust : Customer){
    return this.http.post(environment.apiURL + '/Cutomer',cust).toPromise();
   }
}
