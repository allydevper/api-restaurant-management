import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './interface/order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  async getOrders(): Promise<{ data: Order[]; error?: any }> {
    return this.ordersService.getOrders();
  }

  @Get(':page/:pageSize')
  async getOrdersByPage(@Param('page', ParseIntPipe) page: number, @Param('pageSize', ParseIntPipe) pageSize: number): Promise<{ error?: any }> {
    return this.ordersService.getOrdersByPage(page, pageSize);
  }

  @Post()
  async createOrder(@Body() order: Order): Promise<{ error?: any }> {
    return this.ordersService.createOrder(order);
  }

  @Get(':id')
  async getOrder(@Param('id') id: number): Promise<{ data?: Order; error?: any }> {
    return this.ordersService.getOrderById(id);
  }

  @Post('details')
  async createOrderWithDetails(@Body() order: Order): Promise<{ error?: any }> {
    return this.ordersService.createOrderWithDetails(order);
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
