import "reflect-metadata";
import { IsArray, IsDefined, ValidationError } from 'class-validator';
import { transformAndValidateObject, validationErrorsToString } from './util';

describe('util', () => {

    describe('transform and validate object', () => {

        class TestSchema {
            @IsDefined()
            private id?: string

            @IsArray()
            private array?: string[]
        }

        it('should be defined', () => {
            expect(transformAndValidateObject).toBeDefined()
        })

        it('should return the input as class instance when validation succeeds', () => {
            const inputObject = { id: 'some_id', array: ['array_value'] };

            const output = transformAndValidateObject(inputObject, TestSchema);

            expect(output).toBeInstanceOf(TestSchema)
        })

        it('should throw the failed constraints as error when validation fails', () => {
            const inputObject = { array: 'string_value' };

            let output;
            let error;
            try {
                output = transformAndValidateObject(inputObject, TestSchema);
            } catch (e) {
                error = e;
            }

            expect(output).not.toBeDefined();
            expect(error).toContain('id should not be null or undefined');
            expect(error).toContain('array must be an array');
        })

    })

    describe('validation errors to string', () => {
        const testConstraint1 = 'object must be constraint1';
        const testConstraint2 = 'object must not be constraint2';
        const testConstraint3 = 'object must greater than constraint3';

        const testErrors: ValidationError[] = [
            { property: 'property1_name', constraints: { 
                    firstConstraint: testConstraint1, 
                    secondConstraint: testConstraint2, 
                }
            },
            { property: 'property2_name', constraints: {
                    firstConstraint: testConstraint1,
                    secondConstraint: testConstraint3,
                }
            }
        ]

        it('should return a list of the constraints of the input errors separated by newlines', () => {
            const output = validationErrorsToString(testErrors);

            expect(output).toEqual([testConstraint1, testConstraint2, testConstraint1, testConstraint3].join('\n'))
        })
    })
})