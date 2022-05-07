import { Test, TestingModule } from '@nestjs/testing';
import { TrainingBuddyApiResolver } from './training-buddy-api.resolver';
import { TrainingBuddyServiceService } from '@training-buddy/api/internal-api/service/training-buddy-service'
describe('TrainingBuddyApiResolver', () => {
  let resolver: TrainingBuddyApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingBuddyApiResolver, TrainingBuddyServiceService],
    }).compile();

    resolver = module.get<TrainingBuddyApiResolver>(TrainingBuddyApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
