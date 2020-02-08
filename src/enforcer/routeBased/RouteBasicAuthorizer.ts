import { Context } from 'koa';
import { Enforcer, newEnforcer } from 'casbin';
import { join } from 'path';
import { Roles } from '../../entity/enum';
import promiseRaceTrue from '../../util/common/PromiseRaceTrue';
import PermissionErrors from '../../util/error/permissionError';

class RouteBasicAuthorizer {
  private ctx: Context;
  private enforcer?: Enforcer;

  constructor(option: { ctx: Context; enforcer?: Enforcer }) {
    this.ctx = option.ctx;
    this.enforcer = option.enforcer;
  }

  initEnforcer = async () => {
    if (!this.enforcer) {
      this.enforcer = await newEnforcer(
        join(__dirname, 'route_keymatch_model.conf'),
        join(__dirname, 'route_keymatch_policy.csv')
      );
    }
  };

  getUserRoles = (): Roles[] => {
    return this.ctx.state.jwtData?.roles ?? [Roles.visitor];
  };

  checkPermission = async () => {
    const { ctx, enforcer, getUserRoles } = this;
    const { originalUrl: path, method } = ctx;
    const roles = getUserRoles();
    await this.initEnforcer();
    if (!enforcer) {
      return Promise.reject(new Error(PermissionErrors.INVALID_ENFORCER));
    }
    return promiseRaceTrue(roles.map(role => enforcer.enforce(role, path, method)));
  };
}

export default RouteBasicAuthorizer;
