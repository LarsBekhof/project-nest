import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
	@InjectRepository(User) public readonly repository: Repository<User>;

	public findByEmail(email: string): Promise<User> {
		return this.repository.findOne({ email });
	}
}
