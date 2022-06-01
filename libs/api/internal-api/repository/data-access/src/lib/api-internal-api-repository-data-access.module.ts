import { Module } from '@nestjs/common';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import * as admin from 'firebase-admin';

@Module({
  controllers: [],
  providers: [ApiInternalApiRepositoryDataAccessService],
  exports: [ApiInternalApiRepositoryDataAccessService],
})
export class ApiInternalApiRepositoryDataAccessModule {}
