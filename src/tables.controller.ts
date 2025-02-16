import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TablesService } from './tables.service';
import { Table } from './interface/table.interface';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) { }

  @Post()
  async createTable(@Body() table: Table): Promise<{ error?: any }> {
    return this.tablesService.createTable(table);
  }

  @Get()
  async getTables(): Promise<{ data: Table[]; error?: any }> {
    return this.tablesService.getTables();
  }

  @Get(':id')
  async getTable(@Param('id') id: number): Promise<{ data?: Table; error?: any }> {
    return this.tablesService.getTableById(id);
  }

  @Put(':id')
  async updateTable(@Param('id') id: number, @Body() table: Table): Promise<{ error?: any }> {
    return this.tablesService.updateTable(id, table);
  }

  @Delete(':id')
  async deleteTable(@Param('id') id: number): Promise<{ error?: any }> {
    return this.tablesService.deleteTable(id);
  }
}
