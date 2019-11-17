import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { GqlAuthGuard } from './auth.guard';

@Module({
	imports: [UserModule, PassportModule.register({ session: true })],
	providers: [AuthService, AuthResolver, LocalStrategy],
	exports: [GqlAuthGuard],
})
export class AuthModule {}
