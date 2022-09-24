import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });

  /**
   * Test getRequest function
   */
  it('should return request body', () => {
      const context: any = {
        getContext: () => {
          return {
            req: {
              body: {
                email: 'tester@gmail.com',
                password: '123456',
              },
            },
          };
        },
      };

      const guard = new JwtAuthGuard();

      jest.spyOn(guard, 'getRequest').mockImplementation(() => context.getContext().req);

      expect(guard.getRequest(context)).toEqual({
        body: {
          email: 'tester@gmail.com',
          password: '123456',
        },
      });
  });

});
