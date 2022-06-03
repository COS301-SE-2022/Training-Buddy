import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {AuthGuard} from '@nestjs/passport';


@Injectable()
export class LoginGuard extends AuthGuard ('local'){
 constructor(){
   super();
 }
 /**
  * 
  * @param context 
  * @returns RequestBody
  */
 getRequest(context: ExecutionContext){
   const ctx = GqlExecutionContext.create(context);
   const request = ctx.getContext();
   request.body = ctx.getArgs().loginInput;
   return request;
 }
 
}
