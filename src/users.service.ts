import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }
  private readonly saltRounds = 10;

  async getUsers(): Promise<{ data: User[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('userid, username, role, createdat')
      .order('createdat', { ascending: false, nullsFirst: false });
    return { data: data as User[], error };
  }

  async getUsersByPage(page: number = 1, pageSize: number = 10): Promise<{ data: User[]; count: number; error?: any }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { count, data, error } = await this.supabase
      .from('rm_users')
      .select('userid, username, role, createdat', { count: 'exact' })
      .order('createdat', { ascending: false, nullsFirst: false })
      .range(from, to);
    return { data: data as User[], count, error };
  }

  async getUserById(id: number): Promise<{ data?: User; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('userid, username, role, createdat')
      .eq('userid', id)
      .single();
    return { data: data as User, error };
  }

  async createUser(user: User): Promise<{ error?: any }> {
    user.passwordhash = await bcrypt.hash(user.password, this.saltRounds);
    delete user.password;
    const { error } = await this.supabase
      .from('rm_users')
      .insert([user]);
    return { error };
  }

  async updateUser(id: number, user: User): Promise<{ error?: any }> {
    user.passwordhash = await bcrypt.hash(user.password, this.saltRounds);
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

  async login(username: string, password: string): Promise<{ data?: User; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_users')
      .select('userid, username, passwordhash, role, createdat')
      .eq('username', username)
      .single();

    if (error || !data) {
      return { error: 'Usuario no encontrado' };
    }

    const isPasswordValid = await this.verifyPassword(password, data.passwordhash);
    if (!isPasswordValid) {
      return { error: 'Contraseña incorrecta' };
    }

    delete data.passwordhash;
    delete data.createdat;

    return { data: data as User };
  }

  private async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
