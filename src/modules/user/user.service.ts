import {
	Injectable,
} from '@nestjs/common';
import {
	InjectRepository,
} from '@nestjs/typeorm';
import {
	Repository,
} from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
	@InjectRepository(User) private readonly userRepository: Repository<User>;

	public find(id: number): Promise<User> {
		return this.userRepository.findOne(id);
	}

	public findByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({ email });
	}
}
