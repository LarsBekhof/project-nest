import { UseGuards, Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserInput } from './inputs';

import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/auth.guard';

@Resolver('User')
export class UserResolver {
	@Inject(UserService) private readonly userService: UserService;

	@UseGuards(GqlAuthGuard)
	@Query(returns => User, { nullable: true })
	public currentUser(
		@CurrentUser() user: User,
	) {
		return this.userService.repository.findOne(user.id);
	}

	@UseGuards(GqlAuthGuard)
	@Query(returns => User, { nullable: true })
	public user(
		@Args({
			name: 'input',
			type: () => UserInput,
		})
		input: UserInput,
	) {
		return this.userService.repository.findOne(input.id);
	}
}
