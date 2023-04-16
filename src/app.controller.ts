import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { AppService } from './app.service';

class CreatePostDto {
	name: string;
	age: number;
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

}
