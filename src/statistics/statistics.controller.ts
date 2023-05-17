import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/User.decorator';

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Auth()
	@Get('main')
	async getStatistics(@CurrentUser('id') id: string) {
		return this.statisticsService.getMainStatistics(Number(id));
	}
}
