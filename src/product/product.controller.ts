import { Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";

@Controller("product")
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
