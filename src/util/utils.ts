/** represents an object that has properties
 */
export type UnknownObject = { [key: string]: any };

/** merges two objects by assigning each prop value from objectB to objectA (except those props with falsy values)
 */
export const mergeObjects = <A extends UnknownObject, B extends UnknownObject>(
    objectA: A,
    objectB: B,
): A & B => {
    let res = {} as any;

    Object.keys({ ...objectA, ...objectB }).map((key: string) => {
        res[key] = objectB[key] || objectA[key];
    });

    return res as A & B;
};
