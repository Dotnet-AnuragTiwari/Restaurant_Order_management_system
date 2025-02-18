import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItem } from '../Model/order-item.model';
import { Order } from '../Model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData : Order ;
  orderItems:OrderItem[];
  constructor(private httpclient:HttpClient) { }

  saveOrUpdateOrder(){
    var body={
      ...this.formData,
      OrderItems: this.orderItems
    };

  return  this.httpclient.post(environment.apiURL+'/Order',body);
  }

  GetOrderList(){
    return this.httpclient.get(environment.apiURL+'/Order').toPromise();
   }

   GetOrderById(id: number): any{
    return this.httpclient.get(environment.apiURL+'/Order/'+id).toPromise();
   }

   DeleteOrder(id: number){
    return this.httpclient.delete(environment.apiURL+'/Order/'+id).toPromise();
   }



   GenerateBill()
   {
    var body={
      ...this.formData,
      OrderItems: this.orderItems
    };
     return body;
   }
}
