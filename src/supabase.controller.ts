import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('orders')
  async getOrders() {
    return this.supabaseService.getOrders();
  }

  @Get('order-details')
  async getOrderDetails() {
    return this.supabaseService.getOrderDetails();
  }

  @Get('tables')
  async getTables() {
    return this.supabaseService.getTables();
  }
}
