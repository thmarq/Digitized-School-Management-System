import { createParamDecorator, ExecutionContext } from "@nestjs/common";


//creating decorator//
export const TokenUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})