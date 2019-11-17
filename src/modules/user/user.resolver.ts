import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserInput } from './inputs';

@Resolver('User')
export class UserResolver {
	@Inject(UserService) private readonly userService: UserService;

	@Query(returns => User, { nullable: true })
	public user(
		@Args({
			name: 'input',
			type: () => UserInput,
		})
		input: UserInput,
	) {
		return this.userService.find(input.id);
	}
}
