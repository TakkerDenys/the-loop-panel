import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntegrationModule } from 'src/integrations/integration.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), IntegrationModule],
})
export class AppModule {}
