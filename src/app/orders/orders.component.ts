import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../Shared/Services/order.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    standalone: false
})
export class OrdersComponent implements OnInit {

  OrderList;
  constructor(private orderserv: OrderService,
              private router: Router,
              private dialog:MatDialog,
              private toasterserv: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.orderserv.GetOrderList().then(res=> this.OrderList = res);
  }
  openForEdit(OrderId: number){
    this.router.navigate(['/order/edit/'+OrderId]);
  }

  GenerateBill(Id: number){
    const dialog = new MatDialogConfig();
        dialog.disableClose = false;
        dialog.width = "50%";
        dialog.data = Id;
        this.dialog.open(GenerateBillComponent,dialog);
  }

  onOrderDelete(Id: number) {
    const dialog = new MatDialogConfig();
    dialog.disableClose = false;
    dialog.width = "25%";
    dialog.data = "Do you want to delete this item?";
    this.dialog.open(ConfirmationDialogComponent, dialog).afterClosed().subscribe(result => {
      if (result) {
        this.orderserv.DeleteOrder(Id).then(res=>{
          this.refreshList();
          this.toasterserv.warning("Deleted Successfully","Restaurant Management");
        });
      }
    });
  }
}
