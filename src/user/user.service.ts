import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from './user.dto';
import { returnUserObject } from './return-user.object';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {
	}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				//@ts-ignore
				favourites: {
					select: {
						id: true,
						name: true,
						price: true,
						images: true,
						slug: true
					}
				},
				...selectObject
			}
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async updateProfile(id: number, dto: UserDto) {

	}

	async toggleFavourite(productId: string, id: number) {

	}
}
