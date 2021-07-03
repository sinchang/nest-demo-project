import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class MoviesController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findOne(@Query('login') login: string) {
    if (!login) throw new NotFoundException();

    return await this.usersService.findOne(login);
  }
}
