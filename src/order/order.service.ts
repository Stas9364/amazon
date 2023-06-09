import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getAllOrders(userId) {
		const orders = await this.prisma.order.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc',
			},
		});

		if (!orders) throw new NotFoundException('Orders not found');

		return orders;
	}
}
