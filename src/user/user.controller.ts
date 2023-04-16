import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/User.decorator';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@HttpCode(200)
	@Put('profile')
	async profileUpdate(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto);
	}

	@Auth()
	@HttpCode(200)
	@Patch('profile/favourites/:productId')
	async toggleFavourite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavourite(id, Number(productId));
	}
}
