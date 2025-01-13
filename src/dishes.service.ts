import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { Dish } from './models/dish.model';

@Injectable()
export class DishesService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createDish(dish: Dish): Promise<{ data: Dish; error: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .insert([dish]);
    return { data, error };
  }

  async getDishes(): Promise<{ data: Dish[]; error: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .select(`
        *,
        dishescategory : rm_dishescategory (
          name
        )
      `);
    return { data, error };
  }

  async getDish(id: number): Promise<{ data: Dish; error: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .select('*')
      .eq('dishid', id)
      .single();
    return { data, error };
  }

  async updateDish(id: number, dish: Dish): Promise<{ data: Dish; error: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .update(dish)
      .eq('dishid', id);
    return { data, error };
  }

  async deleteDish(id: number): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .delete()
      .eq('dishid', id);
    return { data, error };
  }
}
