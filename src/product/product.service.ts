import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
	returnProductObject,
	returnProductObjectFullest,
} from './return-product.object';
import { ProductDto } from './dto/product.dto';
import { generateSlug } from '../utils/generate-slug';
import { EnumProductSort, GetAllProductsDto } from './dto/get-all.products.dto';
import { PaginationService } from '../pagination/pagination.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private pagination: PaginationService
	) {}

	async getAllProducts(dto: GetAllProductsDto = {} as GetAllProductsDto) {
		const { sort, searchTerm } = dto;

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

		if (sort === EnumProductSort.LOW_PRICE) {
			prismaSort.push({ price: 'asc' });
		} else if (sort === EnumProductSort.HIGH_PRICE) {
			prismaSort.push({ price: 'desc' });
		} else if (sort === EnumProductSort.OLDEST) {
			prismaSort.push({ createdAt: 'asc' });
		} else {
			prismaSort.push({ createdAt: 'desc' });
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive',
								},
							},
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							description: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
			  }
			: {};

		const { perPage, skip } = this.pagination.getPagination(dto);

		const products = await this.prisma.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage,
			select: returnProductObject,
		});

		return {
			products,
			length: await this.prisma.product.count({
				where: prismaSearchTermFilter,
			}),
		};
	}

	async getProductById(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: returnProductObjectFullest,
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async getProductBySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: returnProductObjectFullest,
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async getProductByCategory(slug: string) {
		const product = await this.prisma.product.findMany({
			where: {
				category: { slug },
			},
			select: returnProductObjectFullest,
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async getSimilarProduct(id: number) {
		const currentProduct = await this.getProductById(id);

		if (!currentProduct) throw new NotFoundException('Product not found');

		return await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name,
				},
				NOT: {
					id: currentProduct.id,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: returnProductObject,
		});
	}

	async createProduct() {
		return await this.prisma.product.create({
			data: {
				description: '',
				name: '',
				price: 0,
				slug: '',
			},
		});
	}

	async updateProduct(id: number, dto: ProductDto) {
		const { description, images, name, price, categoryId } = dto;

		return this.prisma.product.update({
			where: { id },
			data: {
				name,
				price,
				description,
				images,
				slug: generateSlug(name),
				category: {
					connect: { id: categoryId },
				},
			},
		});
	}

	async deleteProduct(id: number) {
		const del = await this.prisma.product.delete({
			where: { id },
		});

		return { message: `Product ${del.name} was deleted` };
	}
}
