import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interface/user.interface';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUsers(): Promise<{ data: User[]; error?: any }> {
    return this.usersService.getUsers();
  }

  @Get(':page/:pageSize')
  async getUsersByPage(@Param('page', ParseIntPipe) page: number, @Param('pageSize', ParseIntPipe) pageSize: number): Promise<{ error?: any }> {
    return this.usersService.getUsersByPage(page, pageSize);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<{ data?: User; error?: any }> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: User): Promise<{ error?: any }> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: User): Promise<{ error?: any }> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ error?: any }> {
    return this.usersService.deleteUser(id);
  }

  @Post('login')
  async login(@Req() req: Request): Promise<{ data?: User; error?: any }> {
    const { username, password } = req.body;
    return this.usersService.login(username, password);
  }
}
