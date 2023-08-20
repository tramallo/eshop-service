import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('product service', () => {
    let productService: ProductService;

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [ProductService]
        }).compile();

        productService = testModule.get(ProductService);
    })

    it('should be defined', () => {
        expect(productService).toBeDefined()
    })
})