import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GenerateBillComponent } from './orders/generate-bill/generate-bill.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo:'order',pathMatch:'full'},
  { path:'login', component: LoginComponent},
  { path:'orders', component: OrdersComponent},
  { path:'generatebill', component: GenerateBillComponent},
  { path:'order', children:[
                             { path:'', component:OrderComponent },
                             { path:'edit/:id', component:OrderComponent}
                           ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
