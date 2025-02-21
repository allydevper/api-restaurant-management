import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import { OrderDetailsController } from './orderDetails.controller';
import { TablesController } from './tables.controller';
import { DishesController } from './dishes.controller';
import { UsersController } from './users.controller';
import { OrdersService } from './orders.service';
import { OrderDetailsService } from './orderDetails.service';
import { TablesService } from './tables.service';
import { DishesService } from './dishes.service';
import { UsersService } from './users.service';
import { createClient } from '@supabase/supabase-js';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    OrdersController,
    OrderDetailsController,
    TablesController,
    DishesController,
    UsersController,
    DashboardController
  ],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseKey = configService.get<string>('SUPABASE_KEY');
        return createClient(supabaseUrl, supabaseKey);
      },
    },
    OrdersService,
    OrderDetailsService,
    TablesService,
    DishesService,
    UsersService,
    DashboardService
  ],
})
export class AppModule { }
