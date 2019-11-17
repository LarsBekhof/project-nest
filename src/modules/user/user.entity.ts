import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
	@Field(type => Int)
	@PrimaryGeneratedColumn()
	public id: number;

	@Field()
	@Column()
	public email: string;

	@Column()
	public password: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	public firstName: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	public lastName: string;
}
