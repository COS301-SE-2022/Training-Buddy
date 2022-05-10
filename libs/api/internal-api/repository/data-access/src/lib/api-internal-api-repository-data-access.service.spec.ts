import { Test } from '@nestjs/testing';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';

describe('ApiInternalApiRepositoryDataAccessService', () => {
  let service: ApiInternalApiRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiInternalApiRepositoryDataAccessService],
    }).compile();

    service = module.get(ApiInternalApiRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
