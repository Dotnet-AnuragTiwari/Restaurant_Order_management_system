import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderService } from './Shared/Services/order.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {NgxPrintModule} from 'ngx-print';
import { MenuItemComponent } from './orders/menu-item/menu-item.component';
import { ConfirmationDialogComponent } from './orders/confirmation-dialog/confirmation-dialog.component';
import { GenerateBillComponent } from './orders/generate-bill/generate-bill.component';
import { LoginComponent } from './login/login.component';

@NgModule({ declarations: [
        AppComponent,
        OrdersComponent,
        OrderItemsComponent,
        OrderComponent,
        MenuItemComponent,
        ConfirmationDialogComponent,
        GenerateBillComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        NgxPrintModule], providers: [OrderService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
