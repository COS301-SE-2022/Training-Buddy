import { Module } from '@nestjs/common';
import { ApiInternalApiRepositoryDataAccessService } from './api-internal-api-repository-data-access.service';
import { PrismaService } from '@training-buddy/api/shared/services/prisma//data-access';

@Module({
  controllers: [],
  providers: [ApiInternalApiRepositoryDataAccessService, PrismaService],
  exports: [ApiInternalApiRepositoryDataAccessService],
})
export class ApiInternalApiRepositoryDataAccessModule {}
