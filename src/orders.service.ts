import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { Order } from './interface/order.interface';

@Injectable()
export class OrdersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async getOrders(): Promise<{ data: Order[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select(`
        *,
        tables : rm_tables (
          tablenumber
        )
      `)
      .order('createdat', { ascending: false, nullsFirst: false });
    return { data, error };
  }

  async getOrdersByPage(page: number = 1, pageSize: number = 10): Promise<{ data: Order[]; count: number; error?: any }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { count, data, error } = await this.supabase
      .from('rm_orders')
      .select(`*, tables : rm_tables (tablenumber)`, { count: 'exact' })
      .order('createdat', { ascending: false, nullsFirst: false })
      .range(from, to);
    return { data, count, error };
  }

  async getOrderById(id: number): Promise<{ data?: Order; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select(`
        *,
        tables : rm_tables (
          tablenumber
        ),
        details: rm_orderdetails (
          *
        )
      `)
      .eq('orderid', id)
      .single();
    return { data, error };
  }

  async createOrder(order: Order): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orders')
      .insert([order]);
    return { error };
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
        .from('rm_orderdetails')
        .insert(detailsWithOrderId);

      if (detailsError) {
        return await this.deleteOrder(orderId);
      }
    }

    return { error: null };
  }

  async updateOrderWithDetails(id: number, order: Order): Promise<{ error?: any }> {
    const { details, ...orderData } = order;

    const { error: orderError } = await this.supabase
      .from('rm_orders')
      .update(orderData)
      .eq('orderid', id);

    if (orderError) {
      return { error: orderError };
    }

    if (details && details.length > 0) {
      const { data: existingDetails, error: existingDetailsError } = await this.supabase
        .from('rm_orderdetails')
        .select('orderdetailid')
        .eq('orderid', id);

      if (existingDetailsError) {
        return { error: existingDetailsError };
      }

      const existingDetailIds: number[] = existingDetails.map((detail) => detail.orderdetailid);
      const newDetailIds = details
        .map((detail) => detail.orderdetailid)
        .filter((orderdetailid) => orderdetailid > 0);

      const detailsToDelete: number[] = existingDetailIds.filter((orderdetailid) => !newDetailIds.includes(orderdetailid));

      if (detailsToDelete.length > 0) {
        const { error: deleteError } = await this.supabase
          .from('rm_orderdetails')
          .delete()
          .in('orderdetailid', detailsToDelete);

        if (deleteError) {
          return { error: deleteError };
        }
      }

      for (const detail of details) {
        if (detail.orderdetailid) {
          const { error: updateDetailError } = await this.supabase
            .from('rm_orderdetails')
            .update(detail)
            .eq('orderdetailid', detail.orderdetailid);

          if (updateDetailError) {
            return { error: updateDetailError };
          }
        } else {
          const { error: insertDetailError } = await this.supabase
            .from('rm_orderdetails')
            .insert([{ ...detail, orderid: id }]);

          if (insertDetailError) {
            return { error: insertDetailError };
          }
        }
      }
    }

    return { error: null };
  }
}
