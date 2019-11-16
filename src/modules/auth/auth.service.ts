import {
	Injectable,
	Inject,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import {
	UserService,
} from '../user/user.service';
import {
	User,
} from '../user/user.entity';

@Injectable()
export class AuthService {
	@Inject(UserService) private readonly userService: UserService;

	async validateUser(email: string, password: string): Promise<User|null> {
		const user = await this.userService.findByEmail(email);

		if (user && bcrypt.compareSync(password, user.password)) {
			return user;
		}

		return null;
	}
}
