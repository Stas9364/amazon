import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class StatisticsService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async getMainStatistics(id: number) {
		const user = await this.userService.byId(id, {
			orders: {
				select: {
					items: {
						select: { price: true },
					},
				},
			},
			reviews: true,
		});

		if (!user) throw new NotFoundException('User not found');

		// return user.orders;

		return [
			{
				name: 'Orders',
				value: user.orders.length,
			},
			{
				name: 'Reviews',
				value: user.reviews.length,
			},
			{
				name: 'Favourites',
				value: user.favourites.length,
			},
			{
				name: 'Total amount',
				value: 1000,
			},
		];
	}
}
