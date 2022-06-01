import { Test, TestingModule } from '@nestjs/testing';
import { TrainingBuddyServiceService } from './training-buddy-service.service';
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { JwtModule } from '@nestjs/jwt';
import {UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
describe('TrainingBuddyServiceService', () => {
  let service: TrainingBuddyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingBuddyServiceService,ApiInternalApiRepositoryDataAccessService,UserEntity],
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
