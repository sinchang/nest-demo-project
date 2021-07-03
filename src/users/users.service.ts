import { Inject, Injectable } from '@nestjs/common';
import { Sdk } from 'src/generated/graphql';

@Injectable()
export class UsersService {
  constructor(
    @Inject('TypeSafeGqlSdk')
    private readonly sdk: Sdk,
  ) {}
  async findOne(login: string) {
    const data = await this.sdk.User({
      login,
    });

    return data;
  }
}
