import { Module } from '@nestjs/common';
import {
  GraphQLRequestModule,
  GraphQLClientInject,
} from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getSdk } from 'src/generated/graphql';
import { RootConfig } from 'src/config';
import { clientTimingWrapper } from 'src/utils';

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      inject: [RootConfig],
      useFactory: async (config: RootConfig) => {
        return {
          endpoint: 'https://api.github.com/graphql',
          options: {
            headers: {
              Authorization: `bearer ${config.TOKEN}`,
            },
          },
        };
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'TypeSafeGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) =>
        getSdk(client, clientTimingWrapper),
    },
  ],
})
export class UsersModule {}
