import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { RootConfig } from 'src/config';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: RootConfig,
  ) {}
  @Get()
  async findOne(@Query('login') login: string) {
    if (!login) throw new NotFoundException();

    return await this.usersService.findOne(login);
  }
}
