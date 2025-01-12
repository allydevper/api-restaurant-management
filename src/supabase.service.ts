import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient
  ) { }

  async getOrders() {
    const { data, error } = await this.supabase
      .from('rm_orders')
      .select('*');
    return { data, error };
  }

  async getOrderDetails() {
    const { data, error } = await this.supabase
      .from('rm_orderDetails')
      .select('*');
    return { data, error };
  }

  async getTables() {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .select('*');
    return { data, error };
  }
}
