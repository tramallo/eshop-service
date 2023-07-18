import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
    async getProducts(): Promise<any[]> {
        return [{name: 'getProuct1', price: 3}, {name: 'getProuct2', price: 1}];
    }

    async createProduct() {
        const newProduct = ProductEntity.create();
        newProduct.name = 'product 999';
        newProduct.price = 500;

        return await newProduct.save()
    }
}
