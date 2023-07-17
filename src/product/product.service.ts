import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
    constructor() { }

    async getProducts(): Promise<any[]> {
        return [];
    }

    async createProduct() {
        const newProduct = ProductEntity.create();
        newProduct.name = 'product 999';
        newProduct.price = 500;

        return await newProduct.save()
    }
}
