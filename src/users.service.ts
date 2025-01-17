import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }
  private readonly saltRounds = 10;

  async createUser(user: User): Promise<{ error?: any }> {

    user.passwordhash = await bcrypt.hash(user.password, this.saltRounds);;
    delete user.password;
    const { error } = await this.supabase
      .from('rm_users')
      .insert([user]);
    return { error };
  }

  async getUsers(): Promise<{ data: User[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('userid, username, role, createdat');
    return { data: data as User[], error };
  }

  async getUserById(id: number): Promise<{ data?: User; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('userid, username, role, createdat')
      .eq('userid', id)
      .single();
    return { data: data as User, error };
  }

  async updateUser(id: number, user: User): Promise<{ error?: any }> {
    user.passwordhash = await bcrypt.hash(user.password, this.saltRounds);;
    delete user.password;
    const { error } = await this.supabase
      .from('rm_users')
      .update(user)
      .eq('userid', id);
    return { error };
  }

  async deleteUser(id: number): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_users')
      .delete()
      .eq('userid', id);
    return { error };
  }
}
