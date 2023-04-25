import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
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
		@CurrentUser('id') userId: string,
		@Param('productId') productId: string,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.createReview(
			Number(userId),
			Number(productId),
			dto
		);
	}

	@Get(':productId')
	async getAverageRating(@Param('productId') productId: string) {
		return this.reviewService.getAverageRating(Number(productId));
	}
}
