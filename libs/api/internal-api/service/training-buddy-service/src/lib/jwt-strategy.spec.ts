import { JwtStrategy } from './jwt-strategy';

describe('JwtStrategy', () => {
  it('should be defined', () => {
    expect(new JwtStrategy()).toBeDefined();
  });

  describe('validate', () => {
    it('should validate user', async () => {
        expect(new JwtStrategy().validate).toHaveReturned;
    });
  });


});
