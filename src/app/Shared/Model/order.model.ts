import { Customer } from "./customer.model";

export class Order {
    customer : Customer;
    OrderId: number;
    OrderNo: string;
    PayMethod: string;
    GTotal: number;
    DeletedOrderItemIDs: string;
    Discount:number;
    GST: number;
    CGST: number;
}
