import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super();
	}

	@Inject(AuthService) private readonly authService: AuthService;

	public async validate(username: string, password: string): Promise<any> {
		console.log(username, password);
		const user = await this.authService.validateUser(username, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
