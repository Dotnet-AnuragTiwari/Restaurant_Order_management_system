import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Shared/Model/customer.model';
import { CommonService } from 'src/app/Shared/Services/common.service';
import { CustomerService } from 'src/app/Shared/Services/customer.service';
import { OrderService } from 'src/app/Shared/Services/order.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { GenerateBillComponent } from '../generate-bill/generate-bill.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    standalone: false
})
export class OrderComponent implements OnInit {

  customer: Customer = new Customer();
  isValid: boolean = true;
  constructor(public orderserv: OrderService,
    private dialog: MatDialog,
    private customerserv: CustomerService,
    private toasterServ: ToastrService,
    private commonserv: CommonService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let orderId = this.currentRoute.snapshot.paramMap.get('id');
    if (orderId == null) {
      this.resetForm(null);
      this.commonserv.GetTaxList().then(res => {
        this.orderserv.formData.CGST = res[0].GstVal;
        this.orderserv.formData.GST = res[0].CGstVal;
      });
    }
    else {
      this.orderserv.GetOrderById(parseInt(orderId)).then(res => {     
        this.orderserv.formData = res.order;
        this.orderserv.formData.customer = res.Customer;
        this.orderserv.orderItems = res.orderDetails;
      })
    }
    
  }

  resetForm(form?: NgForm) {
    if (form = null) {
      form.resetForm();
    }
    this.orderserv.formData = {
      OrderId: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      PayMethod: '',
      GTotal: 0,
      DeletedOrderItemIDs: '',
      Discount: 0,
      customer : this.customer,
      GST: 0,
      CGST: 0
    }

    this.orderserv.orderItems = [];
  }

  AddorEditOrderItem(orderItemIndex, orderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, orderId }
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }

  OnDeleteOrderItem(orderItemId: number, i: number) {
    if (orderItemId == null) {
      this.orderserv.formData.DeletedOrderItemIDs += orderItemId + ",";
    }
    this.orderserv.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.orderserv.formData.GTotal = this.orderserv.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);

    this.orderserv.formData.GTotal = parseFloat((this.orderserv.formData.GTotal).toFixed(2));
    var discamount = this.PercentAmount(this.orderserv.formData.Discount);
    var gstamount = this.PercentAmount(this.orderserv.formData.GST);
    var cgstamount = this.PercentAmount(this.orderserv.formData.CGST);
    this.orderserv.formData.GTotal = parseFloat((this.orderserv.formData.GTotal - discamount).toFixed(2))

    this.orderserv.formData.GTotal = parseFloat((this.orderserv.formData.GTotal + gstamount).toFixed(2))
    this.orderserv.formData.GTotal = parseFloat((this.orderserv.formData.GTotal + cgstamount).toFixed(2))
  }

  validateForm() {
    this.isValid = true;
    if (this.orderserv.formData.customer.CustomerName == null) {
      this.isValid = false;
    }
    else if (this.orderserv.orderItems.length == 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.orderserv.saveOrUpdateOrder().subscribe(res => {
        this.GenerateBill();
        this.resetForm();
        this.toasterServ.success('Data Submitted Successfully', 'Restaurant Management');
        this.router.navigate(['/orders']);

      })
    }
  }

  ShowMenu() {
    const dialog = new MatDialogConfig();
    dialog.disableClose = false;
    dialog.width = "50%";
    this.dialog.open(MenuItemComponent, dialog);
  }

  PercentAmount(amount: number): number {
    var total = 0;
    total = (this.orderserv.formData.GTotal * amount) / 100;
    return total;
  }

  GenerateBill() {
    const dialog = new MatDialogConfig();
    dialog.disableClose = false;
    dialog.width = "25%";
    dialog.data = "Do you want to generate the bill?";
    this.dialog.open(ConfirmationDialogComponent, dialog).afterClosed().subscribe(result => {
      if (result) {
        const dialog = new MatDialogConfig();
        dialog.disableClose = false;
        dialog.width = "50%";
        this.dialog.open(GenerateBillComponent, dialog);
      }
    });
  }

}
