import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async createOrder(@Body() order: Order): Promise<{ error?: any }> {
    return this.ordersService.createOrder(order);
  }

  @Post('details')
  async createOrderWithDetails(@Body() order: Order): Promise<{ error?: any }> {
    return this.ordersService.createOrderWithDetails(order);
  }

  @Get()
  async getOrders(): Promise<{ data: Order[]; error?: any }> {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  async getOrder(@Param('id') id: number): Promise<{ data?: Order; error?: any }> {
    return this.ordersService.getOrderById(id);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() order: Order): Promise<{ error?: any }> {
    return this.ordersService.updateOrder(id, order);
  }

  @Put('details/:id')
  async updateOrderWithDetails(@Param('id') id: number, @Body() order: Order): Promise<{ error?: any }> {
    return this.ordersService.updateOrderWithDetails(id, order);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<{ error?: any }> {
    return this.ordersService.deleteOrder(id);
  }
}
