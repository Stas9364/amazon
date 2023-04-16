import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/User.decorator';

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Auth()
	@Get()
	async getAllOrders(@CurrentUser('id') id: number) {
		return this.orderService.getAllOrders(id);
	}
}
