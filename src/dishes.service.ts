import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class DishesService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

  async createDish(dish) {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .insert([dish]);
    return { data, error };
  }

  async getDishes() {
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

  async getDish(dishId: string) {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .select('*')
      .eq('dishid', dishId)
      .single();
    return { data, error };
  }

  async updateDish(dishId, dish) {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .update(dish)
      .eq('dishid', dishId);
    return { data, error };
  }

  async deleteDish(dishId) {
    const { data, error } = await this.supabase
      .from('rm_dishes')
      .delete()
      .eq('dishid', dishId);
    return { data, error };
  }
}
