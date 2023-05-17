import { Prisma } from '@prisma/client';
import { returnReviewObject } from '../review/return-review.object';
import { returnCategoryObject } from '../category/return-category.object';

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	slug: true,
	description: true,
	price: true,
	images: true,
	createdAt: true,
	category: { select: returnCategoryObject },
	reviews: { select: returnReviewObject },
};

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject,
	reviews: { select: returnReviewObject },
	category: { select: returnCategoryObject },
};
