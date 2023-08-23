import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";

/** Used to transform a plain object into a class object
 * & validate the result instance
 * 
 * @param inputObject plain object
 * @param schema class to which to transform the object
 * @returns the object as a class instance
 * @throws Error if validation fails
 */
export function transformAndValidateObject<T extends Object>(inputObject: Record<string, unknown>, schema: ClassConstructor<T>): T {
    const configAsClassObject = plainToInstance(schema, inputObject, {
        enableImplicitConversion: true,
    })

    const validationErrors: ValidationError[] = validateSync(configAsClassObject, {
        skipMissingProperties: false,
        forbidUnknownValues: true,
        stopAtFirstError: false,
    })

    if(validationErrors.length) {
        const validationErrorsAsString = validationErrorsToString(validationErrors)
        throw new Error(`Validation failed \n${validationErrorsAsString}`)
    }

    return configAsClassObject;
}

/** Used to transform ValidationError(s) to string
 * default ValidationError.toString() does not provide the most readable messages
 */
export const validationErrorsToString = (validationErrors: ValidationError[]): string => {
    const messages = validationErrors
        .map(validationError => validationErrorConstraintsToString(validationError))
        .flat()
    
    const formattedMessage = messages.join('\n');
    return formattedMessage;
}

/** Used to get the constraints of a validation error as a string[]
 */
export const validationErrorConstraintsToString = (validationError: ValidationError): string[] => {
    let failedConstraintsMessages = Object.values(validationError.constraints!)

    return failedConstraintsMessages;
}