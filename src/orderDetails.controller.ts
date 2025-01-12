import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) { }

  @Post()
  async createOrderDetail(@Body() orderDetail) {
    return this.orderDetailsService.createOrderDetail(orderDetail);
  }

  @Get()
  async getOrderDetails() {
    return this.orderDetailsService.getOrderDetails();
  }

  @Put(':id')
  async updateOrderDetail(@Param('id') id: string, @Body() orderDetail) {
    return this.orderDetailsService.updateOrderDetail(+id, orderDetail);
  }

  @Delete(':id')
  async deleteOrderDetail(@Param('id') id: string) {
    return this.orderDetailsService.deleteOrderDetail(+id);
  }
}
