import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GraphQLRequestModule,
  GraphQLClientInject,
} from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { UsersService } from './users.service';
import { MoviesController } from './users.controller';
import { getSdk } from 'src/generated/graphql';

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          endpoint: 'https://api.github.com/graphql',
          options: {
            headers: {
              Authorization: `bearer ${config.get('TOKEN')}`,
            },
          },
        };
      },
    }),
  ],
  controllers: [MoviesController],
  providers: [
    UsersService,
    {
      provide: 'TypeSafeGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
  ],
})
export class MoviesModule {}
