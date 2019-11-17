import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	@Inject(AuthService) private readonly authService: AuthService;

	async validate(email: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(email, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
