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
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from '../decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAllCategories();
	}

	@Auth()
	@Get(':id')
	async categoryById(@Param('id', ParseIntPipe) id: number) {
		return this.categoryService.categoryById(id);
	}

	@Get('by-slag/:slug')
	async categoryBySlug(@Param('slug') slug: string) {
		return this.categoryService.categoryBySlug(slug);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteCategory(@Param('id', ParseIntPipe) id: number) {
		return this.categoryService.deleteCategory(id);
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@HttpCode(200)
	@Put(':id')
	async updateCategory(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: CategoryDto
	) {
		return this.categoryService.updateCategory(id, dto);
	}

	@Auth()
	@HttpCode(200)
	@Post()
	async createCategory() {
		return this.categoryService.createCategory();
	}
}
