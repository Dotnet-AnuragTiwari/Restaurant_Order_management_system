import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Item } from 'src/app/Shared/Model/item.model';
import { OrderItem } from 'src/app/Shared/Model/order-item.model';
import { ItemService } from 'src/app/Shared/Services/item.service';
import { OrderService } from 'src/app/Shared/Services/order.service';
@Component({
    selector: 'app-order-items',
    templateUrl: './order-items.component.html',
    styleUrls: ['./order-items.component.scss'],
    standalone: false
})
export class OrderItemsComponent implements OnInit {
formData: OrderItem;
ItemList:Item[];
isValid:boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private  ItemService:ItemService,
    private orderService:OrderService ) { }

  ngOnInit(): void {
    this.ItemService.GetItemList().then(res=> this.ItemList = res as Item[]);
    if(this.data.orderItemIndex == null)
    this.formData = {
      OrderItemId:null,
      OrderId:this.data.orderId,
      ItemId:0,
      ItemName:'',
      Price:0,
      Quantity:0,
      Total:0
    }
    else
    this.formData = Object.assign({},this.orderService.orderItems[this.data.orderItemIndex]);

   
  }

  updatePrice(data){
    if (data.selectedIndex == 0) {//if(data.value ==0){
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else{
      this.formData.Price = this.ItemList[data.selectedIndex - 1].Price;
      this.formData.ItemName = this.ItemList[data.selectedIndex - 1].Name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
    if(this.data.orderItemIndex == null){
    this.orderService.orderItems.push(form.value);  
    }
    else
    {
       this.orderService.orderItems[this.data.orderItemIndex] = form.value;
    }
    this.dialogRef.close();
  }
  }

  validateForm(formData:OrderItem){
    this.isValid = true;
    if(formData.ItemId == 0)
    {
      this.isValid = false;
    }
    else if(formData.Quantity == 0)
    {
      this.isValid = false;
    } 
    return this.isValid;
  }
}
