import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class TablesService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createTable(table) {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .insert([table]);
    return { data, error };
  }

  async getTables() {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .select('*');
    return { data, error };
  }

  async getTableById(tableId: string) {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .select('*')
      .eq('tableId', tableId)
      .single();
    return { data, error };
  }

  async updateTable(tableId, table) {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .update(table)
      .eq('tableId', tableId);
    return { data, error };
  }

  async deleteTable(tableId) {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .delete()
      .eq('tableId', tableId);
    return { data, error };
  }
}
