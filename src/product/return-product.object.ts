import { Prisma } from '@prisma/client';
import { returnReviewObject } from '../review/return-review.object';
import { returnCategoryObject } from '../category/return-category.object';

export const returnProductObject: Prisma.ProductSelect = {
	name: true,
	slug: true,
	description: true,
	price: true,
	images: true,
	createdAt: true,
};

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject,
	reviews: { select: returnReviewObject },
	category: { select: returnCategoryObject },
};
