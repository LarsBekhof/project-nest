import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') implements CanActivate {
	public getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}

	public async canActivate(context: ExecutionContext): Promise<any> {
		const request = context.switchToHttp().getRequest();
		const result = await super.canActivate(context);
		await super.logIn(request);

		return result;
	}
}
