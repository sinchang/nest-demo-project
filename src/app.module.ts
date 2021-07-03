import { Module } from '@nestjs/common';
import { PromModule } from '@digikare/nestjs-prom';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './users/users.module';

@Module({
  imports: [
    PromModule.forRoot({
      withHttpMiddleware: {
        enable: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
