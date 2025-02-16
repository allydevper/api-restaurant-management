import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';
import { OrderDetail } from './interface/orderdetail.interface';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) { }

  @Post()
  async createOrderDetail(@Body() orderDetail: OrderDetail): Promise<{ error?: any }> {
    return this.orderDetailsService.createOrderDetail(orderDetail);
  }

  @Get()
  async getOrderDetails(): Promise<{ data: OrderDetail[]; error?: any }> {
    return this.orderDetailsService.getOrderDetails();
  }

  @Get(':id')
  async getOrderDetail(@Param('id') id: number): Promise<{ data?: OrderDetail; error?: any }> {
    return this.orderDetailsService.getOrderDetailById(id);
  }

  @Put(':id')
  async updateOrderDetail(@Param('id') id: number, @Body() orderDetail: OrderDetail): Promise<{ error?: any }> {
    return this.orderDetailsService.updateOrderDetail(id, orderDetail);
  }

  @Delete(':id')
  async deleteOrderDetail(@Param('id') id: number): Promise<{ error?: any }> {
    return this.orderDetailsService.deleteOrderDetail(id);
  }
}
