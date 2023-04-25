import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './dto/category.dto';
import { generateSlug } from '../utils/generate-slug';

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async categoryById(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject,
		});

		if (!category) throw new NotFoundException('Category not found');

		return category;
	}

	async categoryBySlug(slug: string) {
		console.log(slug);
		const slugCategory = await this.prisma.category.findUnique({
			where: { slug },
			select: returnCategoryObject,
		});

		if (!slugCategory) throw new NotFoundException('Slug not found');

		return slugCategory;
	}

	async categoryByIdOrBySlug(id = 0, slug = '') {
		const value = await this.prisma.category.findFirst({
			where: {
				OR: [{ id, slug }],
			},
			select: returnCategoryObject,
		});

		if (!value) throw new NotFoundException('Result not found');

		return value;
	}

	async updateCategory(id: number, dto: CategoryDto) {
		const category = await this.categoryById(id);

		return this.prisma.category.update({
			where: { id },
			data: {
				name: dto.name || category.name,
				slug: generateSlug(dto.name),
			},
		});
	}

	async deleteCategory(id: number) {
		const del = await this.prisma.category.delete({
			where: { id },
		});

		return { message: `Category ${del.name} deleted` };
	}

	async createCategory() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
			},
		});
	}

	async getAllCategories() {
		return this.prisma.category.findMany({
			select: returnCategoryObject,
		});
	}
}
