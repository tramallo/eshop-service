import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    
    const corsConfig = {
        origin: configService.get<string>('CORS_ORIGIN'),
        methods: configService.get<string>('CORS_METHODS')?.split(','),
    }
    app.enableCors(corsConfig)
    
    const port = configService.get<number>('PORT');
    await app.listen(port!);
}

bootstrap();
