import { mergeObjects } from '../util/utils';

export interface ProductProps {
    id: string;
    name: string;
    price: number;
}

export class Product {
    private id: string;
    private name: string;
    private price: number;

    constructor(props: ProductProps) {
        const { id, name, price } = props;

        this.id = id;
        this.name = name;
        this.price = price;
    }

    public getProps(): ProductProps {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
        };

        
    }

    public setProps(newProps: Partial<ProductProps>): Product {
        const currentProps = this.getProps();

        const newUserProps = mergeObjects(currentProps, newProps);

        return new Product(newUserProps);
    }
}
