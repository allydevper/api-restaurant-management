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

  async getOrders(): Promise<{ data: Order[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select('*');
    return { data, error };
  }

  async getOrderById(id: number): Promise<{ data?: Order; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select('*')
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
