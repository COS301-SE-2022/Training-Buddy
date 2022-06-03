import {Injectable , ExecutionContext } from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'
@Injectable()
export class JwtAuthGuard extends AuthGuard ('jwt'){
  /**
   * 
   * @param context 
   * @returns request body
   */
  getRequest(context: ExecutionContext){
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  
}
