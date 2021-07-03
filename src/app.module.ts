import { Module } from '@nestjs/common';
import { PromModule } from '@digikare/nestjs-prom';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RootConfig } from './config';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: dotenvLoader(),
    }),
    PromModule.forRoot({
      withHttpMiddleware: {
        enable: true,
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
