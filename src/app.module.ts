import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ProductModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot('mongodb+srv://db_user_1:ACrXWBJHzKEA1sWu@eshop.2ti5yyj.mongodb.net/?retryWrites=true&w=majority')
    ],
})
export class AppModule {}
