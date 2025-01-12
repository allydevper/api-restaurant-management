import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import { SupabaseController } from './supabase.controller';
import { createClient } from '@supabase/supabase-js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
  ],
  controllers: [SupabaseController],
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
    SupabaseService,
  ],
})
export class AppModule {}
