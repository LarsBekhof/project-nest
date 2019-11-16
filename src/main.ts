import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
	config();

	try {
		const app = await NestFactory.create(AppModule);
		await app.listen(process.env.PORT || 3000);

		Logger.log(`NestJS running on localhost:${process.env.PORT}`);
	} catch (error) {
		Logger.error(error);
	}
}
bootstrap();
