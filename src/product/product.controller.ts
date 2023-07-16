import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    @Get()
    async getProducts(): Promise<Product[]> {
        const products = await this.productService.getProducts();

        return products;
    }
}
