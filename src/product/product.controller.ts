import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { SkipAuth } from '../auth/skip-auth.decorator';

@Controller('product')
export class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    @Get()
    async getProducts(): Promise<any[]> {
        const products = await this.productService.getProducts();

        return products;
    }

    @Post()
    async createProduct(): Promise<ProductEntity> {
        return await this.productService.createProduct();
    }
}
