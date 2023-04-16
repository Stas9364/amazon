import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './dto/review.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService, private productService: ProductService) {
	}

	async getAllReviews() {
		return await this.prisma.review.findMany({
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		});
	}

	async createReview(userId: number, productId: number, dto: ReviewDto) {
		// const product = await this.productService.getById(productId);
		//
		// if(!product) throw new NotFoundException("Product doesn't exist");

		return await this.prisma.review.create({
			data: {
				...dto,
				product: {
					connect: { id: productId }
				},
				user: {
					connect: { id: userId }
				}
			}
		});
	}

	async getAverageRating(productId: number) {
		return await this.prisma.review.aggregate({
			where: { productId },
			_avg: { rating: true }
		})
			.then(rating => rating._avg);
	}

}
