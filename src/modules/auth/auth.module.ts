import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { GqlAuthGuard } from './auth.guard';

@Module({
	imports: [UserModule, PassportModule.register({
		session: true,
		defaultStrategy: 'local',
	})],
	providers: [AuthService, AuthResolver, LocalStrategy, GqlAuthGuard],
	exports: [GqlAuthGuard],
})
export class AuthModule {}
