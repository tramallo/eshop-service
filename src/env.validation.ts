import { Transform, plainToInstance } from "class-transformer";
import { ArrayMinSize, IsDefined, IsIn, IsNotEmpty, IsPositive, IsString, ValidationError, validateSync } from "class-validator"

const expectedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

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
    @IsIn(expectedMethods, {each: true})
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

export const envSchemaValidator = (inputConfig: Record<string, unknown>) => {
    const configAsClassObject = plainToInstance(EnvSchema, inputConfig, {
        enableImplicitConversion: true,
    })

    const validationErrors = validateSync(configAsClassObject, {
        skipMissingProperties: false,
        forbidUnknownValues: true,
        stopAtFirstError: false,
    })

    if(validationErrors.length) {
        console.debug(inputConfig)
        throw new Error(`.env file validation failed \n${formatValidationErrors(validationErrors)}`)
    }

    return configAsClassObject;
}

const formatValidationErrors = (validationErrors: ValidationError[]): string => {
    const messages = validationErrors
        .map(validationError => getFailedValidationMessages(validationError))
        .flat()
    
    const formattedMessage = messages.join('\n');
    return formattedMessage;
}

/** ValidationError exposes the failed validation messages deep nested
 *  This function extracts those strings
 */
const getFailedValidationMessages = (validationError: ValidationError): string[] => {
    let failedConstraintsMessages = Object.values(validationError.constraints!)

    return failedConstraintsMessages;
}