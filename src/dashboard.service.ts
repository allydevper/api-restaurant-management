import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class DashboardService {
    constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) { }

    async getDishes(): Promise<{ count: number; error?: any }> {
        const { count, error } = await this.supabase
            .from('rm_dishes')
            .select('*', { count: 'exact', head: true });
        return { count, error };
    }

    async getTables(): Promise<{ count: number; error?: any }> {
        const { count, error } = await this.supabase
            .from('rm_tables')
            .select('*', { count: 'exact', head: true });
        return { count, error };
    }

    async getOrders(): Promise<{ totalOrders: number; totalIncome: number; error?: any }> {
        const { data, error } = await this.supabase
            .from('rm_orders')
            .select('total, id');

        if (error) {
            return { totalOrders: 0, totalIncome: 0, error };
        }

        const totalOrders = data.length;
        const totalIncome = data.reduce((sum, order) => sum + (order.total || 0), 0);

        return { totalOrders, totalIncome };
    }
} 