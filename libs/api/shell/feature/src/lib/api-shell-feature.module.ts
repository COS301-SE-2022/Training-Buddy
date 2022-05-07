import { FeatureModule as ApiExampleFeatureModule } from '@training-buddy/api/example/api/feature';
import { ApiInternalApiApiTrainingBuddyApiModule as TrainingBuddyApi} from '@training-buddy/api/internal-api/api/training-buddy-api';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
@Module({
  imports: [
    ApiExampleFeatureModule,
    TrainingBuddyApi,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),],
})
export class ApiShellFeatureModule {}
