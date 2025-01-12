import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() user) {
    return this.usersService.createUser(user);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user) {
    return this.usersService.updateUser(+id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
