import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Shared/Services/order.service';

@Component({
    selector: 'app-generate-bill',
    templateUrl: './generate-bill.component.html',
    styleUrls: ['./generate-bill.component.scss'],
    standalone: false
})
export class GenerateBillComponent implements OnInit {

  discamount:string;
  taxamount : string;
  subtotalamount: string;
  constructor(public dialogRef: MatDialogRef<GenerateBillComponent>,
    @Inject(MAT_DIALOG_DATA) public orderId: string,public orderserv: OrderService,
              private currentRoute: ActivatedRoute) { }

              
  ngOnInit(): void {
    this.orderserv.GetOrderById(parseInt(this.orderId)).then(res => {     
      this.orderserv.formData = res.order;
      this.orderserv.formData.customer = res.Customer;
      this.orderserv.orderItems = res.orderDetails;
      this.discamount = ((this.orderserv.formData.Discount *  this.orderserv.formData.GTotal) /100).toFixed(2);
      this.taxamount = (((this.orderserv.formData.GST + this.orderserv.formData.CGST) / 100) * this.orderserv.formData.GTotal).toFixed(2);
      this.subtotalamount = (this.orderserv.formData.GTotal - (parseFloat(this.discamount) + parseFloat(this.taxamount))).toFixed(2);
    })
  }

 
  public dismiss() {
    this.subtotalamount = null;
    this.taxamount = null;
    this.discamount = null;
    this.dialogRef.close();
  } 
}
