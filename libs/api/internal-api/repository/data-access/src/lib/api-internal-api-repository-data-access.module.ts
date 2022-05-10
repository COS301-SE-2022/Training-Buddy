import { Module } from '@nestjs/common';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiInternalApiRepositoryDataAccessService],
  exports: [ApiInternalApiRepositoryDataAccessService],
})
export class ApiInternalApiRepositoryDataAccessModule {}
