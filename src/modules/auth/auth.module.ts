import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
	],
	providers: [
		AuthService,
		AuthResolver,
		LocalStrategy,
	],
})
export class AuthModule {}
