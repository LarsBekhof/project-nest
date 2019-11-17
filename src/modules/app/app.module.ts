import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5000,
			username: 'root',
			password: 'password',
			database: 'database',
			entities: ['dist/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		GraphQLModule.forRoot({
			debug: true,
			playground: true,
			autoSchemaFile: 'schema.gql',
			installSubscriptionHandlers: true,
			context: ({ req }) => ({ req }),
		}),
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
