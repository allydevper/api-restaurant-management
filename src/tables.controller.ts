import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) { }

  @Post()
  async createTable(@Body() table) {
    return this.tablesService.createTable(table);
  }

  @Get()
  async getTables() {
    return this.tablesService.getTables();
  }

  @Get(':id')
  async getTable(@Param('id') id: string) {
    return this.tablesService.getTableById(id);
  }

  @Put(':id')
  async updateTable(@Param('id') id: string, @Body() table) {
    return this.tablesService.updateTable(+id, table);
  }

  @Delete(':id')
  async deleteTable(@Param('id') id: string) {
    return this.tablesService.deleteTable(+id);
  }
}
