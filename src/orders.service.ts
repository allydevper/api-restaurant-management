import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createOrder(order) {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .insert([order]);
    return { data, error };
  }

  async getOrders() {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select('*');
    return { data, error };
  }

  async updateOrder(orderId, order) {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .update(order)
      .eq('orderId', orderId);
    return { data, error };
  }

  async deleteOrder(orderId) {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .delete()
      .eq('orderId', orderId);
    return { data, error };
  }
}
