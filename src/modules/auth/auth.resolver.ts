import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginInput, RegisterInput } from './inputs';
import { User } from '../user/user.entity';

@Resolver('Auth')
export class AuthResolver {
	@Inject(AuthService) private readonly authService: AuthService;
	@Inject(UserService) private readonly userService: UserService;

	@Query(returns => User)
	public async login(
		@Args({
			name: 'input',
			type: () => LoginInput,
		})
		input: LoginInput,
	) {
		const user = await this.authService.validateUser(input.email, input.password);

		if(user) {
			return user;
		}

		throw new Error('Invalid credentials.');
	}

	@Mutation(returns => User)
	public async register(
		@Args({
			name: 'input',
			type: () => RegisterInput,
		})
		input: RegisterInput,
	) {
		const {
			email,
			password,
			passwordConfirm,
		} = input;

		if (await this.userService.findByEmail(email)) {
			throw new Error('User as already been registered.');
		}

		if (password !== passwordConfirm) {
			throw new Error('Password and password confirmation are not the same.');
		}

		return this.authService.registerUser(email, password);
	}
}
