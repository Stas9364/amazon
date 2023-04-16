import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Product } from 'prisma';
import { faker } from '@faker-js/faker';
import { generateSlug } from '../src/utils/generate-slug';

dotenv.config();
const prisma = new PrismaClient();

const createProduct = async (quantity: number) => {
	const products: Product[] = [];

	for (let i = 0; i < quantity; i++) {
		const productName = faker.commerce.productName();
		const categoryName = faker.commerce.department();

		const product = await prisma.product.create({
			data: {
				name: productName,
				slug: generateSlug(productName),
				description: faker.commerce.productDescription(),
				price: Number(faker.commerce.price(10, 999, 0)),
				images: Array
					.from({ length: faker.datatype.number({ min: 2, max: 6 }) })
					.map(() => faker.image.imageUrl(500, 500)),
				category: {
					create: {
						name: categoryName,
						slug: generateSlug(categoryName)
					}
				},
				reviews: {
					create: [
						{
							rating: faker.datatype.number({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: { id: 1 }
							}
						},
						{
							rating: faker.datatype.number({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: { id: 1 }
							}
						}
					]
				}
			}
		});

		products.push(product);
	}

	console.log(`Created ${products.length} products`);
};

async function main() {
	console.log('Seeding error...');

	await createProduct(10);
}

main()
	.catch(e => console.log(e))
	.finally(async () => await prisma.$disconnect());