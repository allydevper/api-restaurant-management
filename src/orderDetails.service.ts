import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { OrderDetail } from './interface/orderdetail.interface';

@Injectable()
export class OrderDetailsService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async getOrderDetails(): Promise<{ data: OrderDetail[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .select('*');
    return { data, error };
  }

  async getOrderDetailById(id: number): Promise<{ data?: OrderDetail; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .select('*')
      .eq('orderdetailid', id)
      .single();
    return { data, error };
  }

  async createOrderDetail(orderDetail: OrderDetail): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orderDetails')
      .insert([orderDetail]);
    return { error };
  }

  async updateOrderDetail(id: number, orderDetail: OrderDetail): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orderDetails')
      .update(orderDetail)
      .eq('orderdetailid', id);
    return { error };
  }

  async deleteOrderDetail(id: number): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_orderDetails')
      .delete()
      .eq('orderdetailid', id);
    return { error };
  }
}
