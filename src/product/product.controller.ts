import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetAllProductsDto } from './dto/get-all.products.dto';
import { Auth } from '../decorators/auth.decorator';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// @UsePipes(new ValidationPipe())
	@Get()
	async getAllProducts(@Query() query: GetAllProductsDto) {
		return this.productService.getAllProducts(query);
	}

	@Get(':id')
	async getProductById(@Param('id', ParseIntPipe) id: number) {
		return this.productService.getProductById(id);
	}

	@Get('by-slug/:slug')
	async getProductBySlug(@Param('slug') slug: string) {
		return this.productService.getProductBySlug(slug);
	}

	@Get('by-category/:slug')
	async getProductByCategory(@Param('slug') slug: string) {
		return this.productService.getProductByCategory(slug);
	}

	@Get('similar/:id')
	async getSimilarProduct(@Param('id', ParseIntPipe) id: number) {
		return this.productService.getSimilarProduct(id);
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	@HttpCode(200)
	async createProduct() {
		return this.productService.createProduct();
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put(':id')
	@HttpCode(200)
	async updateProduct(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: ProductDto
	) {
		return this.productService.updateProduct(id, dto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteProduct(@Param('id', ParseIntPipe) id: number) {
		return this.productService.deleteProduct(id);
	}
}
