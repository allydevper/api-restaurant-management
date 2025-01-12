import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async createOrder(@Body() order) {
    return this.ordersService.createOrder(order);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() order) {
    return this.ordersService.updateOrder(+id, order);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(+id);
  }
}
