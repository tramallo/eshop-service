import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    async getProducts(): Promise<Product[]> {
        return [
            new Product({ id: 'id_prod_1', name: 'prod_1', price: 5 }),
            new Product({ id: 'id_prod_2', name: 'prod_2', price: 3 }),
        ];
    }
}
