import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createUser(user) {
    const { data, error } = await this.supabase
      .from('rm_users')
      .insert([user]);
    return { data, error };
  }

  async getUsers() {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('*');
    return { data, error };
  }

  async getUserById(userId: string) {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('*')
      .eq('userId', userId)
      .single();
    return { data, error };
  }

  async updateUser(userId, user) {
    const { data, error } = await this.supabase
      .from('rm_users')
      .update(user)
      .eq('userId', userId);
    return { data, error };
  }

  async deleteUser(userId) {
    const { data, error } = await this.supabase
      .from('rm_users')
      .delete()
      .eq('userId', userId);
    return { data, error };
  }
}
