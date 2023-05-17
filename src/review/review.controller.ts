import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from '../decorators/auth.decorator';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from '../decorators/User.decorator';

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAllReviews() {
		return this.reviewService.getAllReviews();
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@HttpCode(200)
	@Post('leave/:productId')
	async createReview(
		@CurrentUser('id', ParseIntPipe) userId: number,
		@Param('productId', ParseIntPipe) productId: number,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.createReview(userId, productId, dto);
	}

	@Get(':productId')
	async getAverageRating(@Param('productId', ParseIntPipe) productId: number) {
		return this.reviewService.getAverageRating(productId);
	}
}
