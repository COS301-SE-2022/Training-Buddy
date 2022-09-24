import { JwtStrategy } from './jwt-strategy';

describe('JwtStrategy', () => {
  it('should be defined', () => {
    expect(new JwtStrategy()).toBeDefined();
  });

  /**
   * Test validate function
   */
  it('should return a user', () => {
    const user: any = {
      email: 'tester@gmail.com',
      password: '123456',
    };

    const guard = new JwtStrategy();

    jest.spyOn(guard, 'validate').mockImplementation(() => Promise.resolve(user));

    expect(guard.validate(user)).resolves.toEqual({
      email: 'tester@gmail.com',
      password: '123456',
    });
  });
});
