import { Transform } from "class-transformer";
import { ArrayMinSize, IsDefined, IsNotEmpty, IsPositive, IsString } from "class-validator"

export class EnvSchema {
    @IsDefined()
    @IsPositive()
    APP_PORT?: number;

    @IsNotEmpty()
    @IsString()
    MONGODB_URI?: string
    @IsNotEmpty()
    @IsString()
    MONGODB_DB_NAME?: string

    @IsNotEmpty()
    @IsString()
    CORS_ORIGIN?: string
    @Transform(({value}) => value.split(','))
    @IsDefined({ message: '$property must be defined as a comma-separated list' })
    @ArrayMinSize(1)
    @IsString({each: true})
    CORS_METHODS?: string[]

    @IsNotEmpty()
    @IsString()
    AUTH0_ISSUER_URL?: string
    @IsNotEmpty()
    @IsString()
    AUTH0_AUDIENCE?: string

    @IsNotEmpty()
    @IsString()
    GOOGLE_DRIVE_FOLDER_ID?: string
    @Transform(({value}) => value.split(','))
    @IsDefined({ message: '$property must be defined as a comma-separated list' })
    @ArrayMinSize(1)
    @IsString({each: true})
    GOOGLE_DRIVE_AUTH_SCOPES?: string[]
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.type': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.project_id': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.private_key_id': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.private_key': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.client_email': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.client_id': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.auth_uri': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.token_uri': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.auth_provider_x509_cert_url': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.client_x509_cert_url': string
    @IsNotEmpty()
    @IsString()
    'GOOGLE_DRIVE_CREDENTIALS.universe_domain': string
}
