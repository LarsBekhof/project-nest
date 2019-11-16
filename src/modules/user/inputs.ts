import {
	InputType,
	Field,
	Int,
} from 'type-graphql';

@InputType()
export class UserInput {
	@Field(type => Int)
	public id: number;
}
