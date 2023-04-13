import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserModule } from './user/user.module';

@Module({
	imports: [AuthModule, ConfigModule.forRoot(), UserModule], //import global modules
	controllers: [AppController],
	providers: [AppService, PrismaService, JwtStrategy],
	exports: [] //export current providers
})
export class AppModule {}