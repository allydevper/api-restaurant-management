import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) { }

  @Post()
  async createDish(@Body() dish) {
    return this.dishesService.createDish(dish);
  }

  @Get()
  async getDishes() {
    return this.dishesService.getDishes();
  }

  @Put(':id')
  async updateDish(@Param('id') id: string, @Body() dish) {
    return this.dishesService.updateDish(+id, dish);
  }

  @Delete(':id')
  async deleteDish(@Param('id') id: string) {
    return this.dishesService.deleteDish(+id);
  }
}
