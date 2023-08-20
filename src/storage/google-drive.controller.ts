import { Controller, Get, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { DriveService } from "./google-drive.service";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { SkipAuth } from "../auth/skip-auth.decorator";

@Controller('drive')
export class DriveController {
    private driveService: DriveService;

    constructor(driveService: DriveService) {
        this.driveService = driveService;
    }

    @Post()
    @SkipAuth()
    @UseInterceptors(AnyFilesInterceptor())
    async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        
        const result = await this.driveService.uploadFile(files[0])

        return result;

    }

    @Get()
    @SkipAuth()
    async testCall() {
        return this.driveService.testFunc();
    }
}