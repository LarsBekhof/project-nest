import {
	Inject,
} from '@nestjs/common';
import {
	Resolver,
	Query,
	Args,
} from '@nestjs/graphql';

import {
	AuthService,
} from './auth.service';
import {
	LoginInput,
} from './inputs';
import {
	User,
} from '../user/user.entity';

@Resolver('Auth')
export class AuthResolver {
	@Inject(AuthService) private readonly authService: AuthService;

	@Query(returns => User)
	public login(
		@Args({
			name: 'input',
			type: () => LoginInput,
		}) input: LoginInput,
	) {
		return this.authService.validateUser(input.email, input.password);
	}

}
