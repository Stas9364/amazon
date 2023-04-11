import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(id: string): string {
		return '<h1>Hello World</h1>' + '<div>Nest APP!</div>' + `<div>${id}</div>`;
	}

	getAllHello(): object {
		return { first: 'hello', second: 'hello' };
	}

	create(body): string {
		console.log(body);
		return 'Created';
	}

	remove(id: string): string {
		return 'Delete post ' + id;
	}
}
