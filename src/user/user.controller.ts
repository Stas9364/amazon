import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/User.decorator';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id);
	}

	@UsePipes()
	@Auth()
	@HttpCode(200)
	@Put('profile')
	async profileUpdate(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto);
	}

	@Auth()
	@HttpCode(200)
	@Patch('profile/favourites/:productId')
	async toggleFavourite(@Param('productId') productId: string, @CurrentUser('id') id: number) {
		return this.userService.toggleFavourite(productId, id);
	}
}
