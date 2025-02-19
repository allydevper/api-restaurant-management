import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { Dish } from './interface/dish.interface';

@Injectable()
export class DishesService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async getDishes(): Promise<{ data: Dish[]; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .select(`
        *,
        dishescategory : rm_dishescategory (
          name
        )
      `)
      .order('createdat', { ascending: false, nullsFirst: false });
    return { data, error };
  }

  async getDishesByPage(page: number = 1, pageSize: number = 10): Promise<{ data: Dish[]; error?: any }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabase
      .from('rm_dishes')
      .select(`
        *,
        dishescategory : rm_dishescategory (
          name
        )
      `)
      .order('createdat', { ascending: false, nullsFirst: false })
      .range(from, to);
    return { data, error };
  }

  async getDish(id: number): Promise<{ data?: Dish; error?: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .select('*')
      .eq('dishid', id)
      .single();
    return { data, error };
  }

  async createDish(dish: Dish): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_dishes')
      .insert([dish]);
    return { error };
  }

  async updateDish(id: number, dish: Dish): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_dishes')
      .update(dish)
      .eq('dishid', id);
    return { error };
  }

  async deleteDish(id: number): Promise<{ error?: any }> {
    const { error } = await this.supabase
      .from('rm_dishes')
      .delete()
      .eq('dishid', id);
    return { error };
  }
}
