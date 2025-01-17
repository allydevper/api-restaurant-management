import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() user: User): Promise<{ error?: any }> {
    return this.usersService.createUser(user);
  }

  @Get()
  async getUsers(): Promise<{ data: User[]; error?: any }> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<{ data?: User; error?: any }> {
    return this.usersService.getUserById(id);
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
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { username, password } = req.body;
    const { data, error } = await this.usersService.login(username, password);

    if (error) {
      res.status(400).json({error});
      return;
    }
    res.status(200).json({data})
    return;
  }
}
