import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Dish } from './interface/dish.interface';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) { }

  @Post()
  async createDish(@Body() dish: Dish): Promise<{ error?: any }> {
    return this.dishesService.createDish(dish);
  }

  @Get()
  async getDishes(): Promise<{ data: Dish[]; error?: any }> {
    return this.dishesService.getDishes();
  }

  @Get(':page/:pageSize')
  async getDishesByPage(@Param('page', ParseIntPipe) page: number, @Param('pageSize', ParseIntPipe) pageSize: number): Promise<{ error?: any }> {
    return this.dishesService.getDishesByPage(page, pageSize);
  }

  @Get(':id')
  async getDish(@Param('id', ParseIntPipe) id: number): Promise<{ data?: Dish; error?: any }> {
    return this.dishesService.getDish(id);
  }

  @Put(':id')
  async updateDish(@Param('id', ParseIntPipe) id: number, @Body() dish: Dish): Promise<{ error?: any }> {
    return this.dishesService.updateDish(id, dish);
  }

  @Delete(':id')
  async deleteDish(@Param('id', ParseIntPipe) id: number): Promise<{ error?: any }> {
    return this.dishesService.deleteDish(id);
  }
}
