import { Middleware } from 'koa';
import { Enforcer } from 'casbin';
import RouteBasicAuthorizer from './RouteBasicAuthorizer';
import { Roles } from '../../entity/enum';

function authz(option?: {
  newEnforcer?: () => Promise<Enforcer>;
  authorizer?: RouteBasicAuthorizer;
}): Middleware {
  return async (ctx, next) => {
    try {
      let authorizer: RouteBasicAuthorizer;

      if (option?.authorizer) {
        authorizer = option.authorizer;
      } else if (option?.newEnforcer) {
        authorizer = new RouteBasicAuthorizer({ ctx, enforcer: await option.newEnforcer() });
      } else {
        authorizer = new RouteBasicAuthorizer({ ctx });
        await authorizer.initEnforcer();
      }

      // user sample
      ctx.state = { jwtData: { role: Roles.visitor } };

      const result = await authorizer.checkPermission().catch((error: Error) => {
        ctx.throw(500, error.message);
      });

      if (!result) {
        ctx.throw(403);
      }

      await next();
    } catch (error) {
      throw error;
    }
  };
}

export default authz;
