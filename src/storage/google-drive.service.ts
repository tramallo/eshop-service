import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleAuth, JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { google } from 'googleapis';
import stream from 'stream';

@Injectable()
export class DriveService {
    private googleSession?: GoogleAuth<JSONClient> = undefined;
    private config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;

        const googleCredentials = {
            type: config.get('GOOGLE_DRIVE_CREDENTIALS.type'),
            project_id: config.get('GOOGLE_DRIVE_CREDENTIALS.project_id'),
            private_key_id: config.get('GOOGLE_DRIVE_CREDENTIALS.private_key_id'),
            private_key: config.get('GOOGLE_DRIVE_CREDENTIALS.private_key'),
            client_email: config.get('GOOGLE_DRIVE_CREDENTIALS.client_email'),
            client_id: config.get('GOOGLE_DRIVE_CREDENTIALS.client_id'),
            auth_uri: config.get('GOOGLE_DRIVE_CREDENTIALS.auth_uri'),
            token_uri: config.get('GOOGLE_DRIVE_CREDENTIALS.token_uri'),
            auth_provider_x509_cert_url: config.get('GOOGLE_DRIVE_CREDENTIALS.auth_provider_x509_cert_url'),
            client_x509_cert_url: config.get('GOOGLE_DRIVE_CREDENTIALS.client_x509_cert_url'),
            universe_domain: config.get('GOOGLE_DRIVE_CREDENTIALS.universe_domain'),
        }

        this.googleSession = new google.auth.GoogleAuth({
            scopes: config.get('GOOGLE_DRIVE_AUTH_SCOPES'),
            credentials: googleCredentials,
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);

        const {data} = await google.drive({
            version: 'v3',
            auth: this.googleSession,
        }).files.create({
            media: {
                mimeType: file.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: file.originalname,
                parents: [this.config.get('GOOGLE_DRIVE_FOLDER_ID')!]
            },
            fields: 'id,name'
        })

        return data
    }

    async testFunc() {
        return this.config.get('GOOGLE_DRIVE_CREDENTIALS.type')
    }
}