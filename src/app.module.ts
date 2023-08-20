import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProductModule } from "./product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envSchemaValidator } from "./env.validation";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    StorageModule,
    ProductModule,
    ConfigModule.forRoot({ validate: envSchemaValidator }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mongodb",
        url: configService.get("MONGODB_URI"),
        database: configService.get("MONGODB_DB_NAME"),
        useNewUrlParser: true,
        entities: ["**/*.entity.js"],
        logging: true,
      }),
    }),
  ],
})
export class AppModule {}
