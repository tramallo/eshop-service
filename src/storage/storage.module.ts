import { Module } from "@nestjs/common";
import { DriveService } from "./google-drive.service";
import { DriveController } from "./google-drive.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [MulterModule.register(), ConfigModule],
    controllers: [DriveController],
    providers: [DriveService],
    exports: [DriveService],
})
export class StorageModule { }