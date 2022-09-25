import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  it('should be defined', () => {
    expect(new LoginGuard()).toBeDefined();
  });

  /**
   * Test getRequest function
   */
    it('should return request', () => {

      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            body: {
              email: 'tester@gmail.com',
              password: '123456',
            },
          }),
        }),
      } as ExecutionContext;

      const gqlContext = {
        getContext: () => ({
          body: {
            email: 'tester@gmail.com',
            password: '123456',
          },
        }),
        getArgs: () => ({
          loginInput: {
            email: 'tester@gmail.com',
            password: '123456',
          },
        }),
      } as GqlExecutionContext;


      jest.spyOn(GqlExecutionContext, 'create').mockReturnValue(gqlContext);

      const guard = new LoginGuard();

      //Test getRequest function
      expect(guard.getRequest(context)).toEqual({
        body: {
          email: 'tester@gmail.com',
          password: '123456',
        },
      });
    });
});
