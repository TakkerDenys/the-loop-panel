import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    // Serve static files from uploads folder
    app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
        prefix: '/uploads/',
    });

    const config = new DocumentBuilder()
        .setTitle('The Loop Panel')
        .setDescription(
            "This API is for 'The Loop Panel' project. The Loop Panel is a dynamic content " +
            'management platform for screens (TVs, monitors, media panels)',
        )
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter the JWT access token in the field below',
            },
            'access-token',
        )
        .build();

    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();