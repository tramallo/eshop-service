import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AuthenticationGuard } from './auth/authentication.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const reflector = app.get(Reflector);
    const configService = app.get(ConfigService);

    app.useGlobalGuards(new AuthenticationGuard(configService, reflector))
    
    const corsConfig = {
        origin: configService.get<string>('CORS_ORIGIN'),
        methods: configService.get<string>('CORS_METHODS')?.split(','),
    }
    app.enableCors(corsConfig)
    
    const port = configService.get<number>('APP_PORT');
    await app.listen(port!);
}

bootstrap();
