import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { TrainingBuddyServiceService } from './training-buddy-service.service'
import { ApiInternalApiRepositoryDataAccessService } from '@training-buddy/api/internal-api/repository/data-access';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access' ;
import {UserEntity} from '@training-buddy/api/internal-api/api/shared/interfaces/data-access';
import { JwtModule } from '@nestjs/jwt';
describe('LocalStrategy', () => {
  let provider: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, TrainingBuddyServiceService, ApiInternalApiRepositoryDataAccessService,PrismaService,UserEntity],
      imports: [JwtModule.register({
        signOptions: { expiresIn: '600s'},
        secret:"hide"//TODO hide this 
      })]
    }).compile();

    provider = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
