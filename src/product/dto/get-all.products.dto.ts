import { ProductDto } from './product.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}

export class GetAllProductsDto extends ProductDto {
	@IsOptional()
	@IsEnum(EnumProductSort)
	sort: EnumProductSort;

	@IsOptional()
	@IsString()
	searchTerm: string;
}
