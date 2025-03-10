import { OrderDetail } from "./orderdetail.interface";

export interface Order {
    orderid?: number;
    tableid?: number;
    tablenumber?: number;
    userid?: number;
    total?: number;
    status?: string;
    createdat?: Date;
    details: OrderDetail[];
}
