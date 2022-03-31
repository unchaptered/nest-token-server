import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { User } from "../entity/user.entity";

/**
 * Custom Decorator 를 만들어서 사용하고 있지만,
 * 
 * 이는 Guard Middleware 를 통해서 인증을 했기 때문에 가능한 것이다.
 */
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {

    const req = ctx.switchToHttp().getRequest();
    return req.user;

});