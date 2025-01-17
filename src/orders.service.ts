import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createOrder(order: Order): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orders')
      .insert([order]);
    return { error };
  }
  async createOrderWithDetails(order: Order): Promise<{ error?: any }> {

    const { details, ...orderWithoutDetails } = order;

    const { data: orderData, error: orderError } = await this.supabase
      .from('rm_orders')
      .insert([orderWithoutDetails])
      .select('orderid')
      .single();

    if (orderError) {
      return { error: orderError };
    }

    const orderId = orderData.orderid;

    if (details && details.length > 0) {
      const detailsWithOrderId = details.map((detail) => ({
        ...detail,
        orderid: orderId,
      }));

      const { error: detailsError } = await this.supabase
        .from('rm_orderDetails')
        .insert(detailsWithOrderId);

      if (detailsError) {
        await this.supabase
          .from('rm_orders')
          .delete()
          .eq('orderid', orderId);

        return { error: detailsError };
      }
    }

    return { error: null };
  }

  async getOrders(): Promise<{ data: Order[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select(`
        *,
        tables : rm_tables (
          tablenumber
        )
      `);
    return { data, error };
  }

  async getOrderById(id: number): Promise<{ data?: Order; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select(`
        *,
        tables : rm_tables (
          tablenumber
        )
      `)
      .eq('orderid', id)
      .single();
    return { data, error };
  }

  async updateOrder(id: number, order: Order): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orders')
      .update(order)
      .eq('orderid', id);
    return { error };
  }

  async deleteOrder(id: number): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orders')
      .delete()
      .eq('orderid', id);
    return { error };
  }
}
