import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
	@Inject(UserService) private readonly userService: UserService;

	public async validateUser(email: string, password: string): Promise<User | undefined> {
		const user = await this.userService.findByEmail(email);

		return new Promise((resolve, reject) => {
			if(user && bcrypt.compareSync(password, user.password)) {
				resolve(user);
			} else {
				reject();
			}
		});
	}

	public registerUser(email, password): Promise<User> {
		return this.userService.repository.save(
			this.userService.repository.create({ email, password: bcrypt.hashSync(password, 10) }),
		);
	}
}
