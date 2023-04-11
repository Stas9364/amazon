import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

class CreatePostDto {
	name: string
	age: number
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(':id')
	getHello(@Param('id') id: string): string {
		return this.appService.getHello(id);
	}

	@Get()
	getAllHello(): object {
		return this.appService.getAllHello();
	}

	@Post('hello')
	create(@Body() createPostDto: CreatePostDto): string {
		return this.appService.create(createPostDto);
	}

	@Delete('hello/:id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string): string {
		return this.appService.remove(id);
	}
}

