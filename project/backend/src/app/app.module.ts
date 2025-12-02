import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { IntegrationModule } from 'src/integrations/integration.module';
import { UserModule } from 'src/users/user.module';
import { VideoPlayerModule } from 'src/video-player/video-player.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URL'),
      }),

      inject: [ConfigService],
    }),
    IntegrationModule,
    UserModule,
    AuthModule,
    VideoPlayerModule,
  ],
})
export class AppModule {}
