import { Test, TestingModule } from '@nestjs/testing';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { JwtModule } from '@nestjs/jwt';
describe('TrainingBuddyServiceService', () => {
  let service: TrainingBuddyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingBuddyServiceService ],
      imports: [JwtModule.register({
        signOptions: { expiresIn: '600s'},
        secret:"hide"//TODO hide this 
      })]
    }).compile();

    service = module.get<TrainingBuddyServiceService>(
      TrainingBuddyServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
