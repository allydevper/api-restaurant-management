import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { Table } from './interface/table.interface';

@Injectable()
export class TablesService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createTable(table: Table): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_tables')
      .insert([table]);
    return { error };
  }

  async getTables(): Promise<{ data: Table[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .select('*');
    return { data, error };
  }

  async getTableById(id: number): Promise<{ data?: Table; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_tables')
      .select('*')
      .eq('tableid', id)
      .single();
    return { data, error };
  }

  async updateTable(id: number, table: Table): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_tables')
      .update(table)
      .eq('tableid', id);
    return { error };
  }

  async deleteTable(id: number): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_tables')
      .delete()
      .eq('tableid', id);
    return { error };
  }
}
