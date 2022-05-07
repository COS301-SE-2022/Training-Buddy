import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { TrainingBuddyServiceService } from './training-buddy-service.service'
describe('LocalStrategy', () => {
  let provider: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, TrainingBuddyServiceService],
    }).compile();

    provider = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
