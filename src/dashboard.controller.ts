import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('tables')
    async getTables() {
        return this.dashboardService.getTables();
    }

    @Get('orders')
    async getOrders() {
        return this.dashboardService.getOrders();
    }

    @Get('dishes')
    async getDishes() {
        return this.dashboardService.getDishes();
    }
} 