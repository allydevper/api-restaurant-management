import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class OrderDetailsService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createOrderDetail(orderDetail) {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .insert([orderDetail]);
    return { data, error };
  }

  async getOrderDetails() {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .select('*');
    return { data, error };
  }

  async getOrderDetailById(orderDetailId: string) {
    const { data, error } = await this.supabase
      .from('rm_order_details')
      .select('*')
      .eq('orderdetailid', orderDetailId)
      .single();
    return { data, error };
  }

  async updateOrderDetail(orderDetailId, orderDetail) {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .update(orderDetail)
      .eq('orderdetailid', orderDetailId);
    return { data, error };
  }

  async deleteOrderDetail(orderDetailId) {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .delete()
      .eq('orderdetailid', orderDetailId);
    return { data, error };
  }
}
