import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import { OrderDetailsController } from './orderDetails.controller';
import { TablesController } from './tables.controller';
import { OrdersService } from './orders.service';
import { OrderDetailsService } from './orderDetails.service';
import { TablesService } from './tables.service';
import { createClient } from '@supabase/supabase-js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
  ],
  controllers: [
    OrdersController,
    OrderDetailsController,
    TablesController,
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
  ],
})
export class AppModule { }
