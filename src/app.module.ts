import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RootConfig } from './config';
import { PrometheusModule } from './prometheus/prometheus.module';
import { MetricsModule } from './metrics/metrics.module';
import { InboundMiddleware } from './middleware/inbound.middleware';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: dotenvLoader(),
    }),
    UsersModule,
    PrometheusModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // api/(.*)
    consumer.apply(InboundMiddleware).forRoutes('*');
  }
}
