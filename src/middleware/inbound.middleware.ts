import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Histogram } from 'prom-client';
import * as responseTime from 'response-time';
import { PrometheusService } from 'src/prometheus/prometheus.service';

@Injectable()
export class InboundMiddleware implements NestMiddleware {
  private readonly _histogram: Histogram<string>;

  constructor(private readonly _service: PrometheusService) {
    this._histogram = this._service.registerMetrics(
      'http_requests',
      'HTTP requests - Duration in seconds',
      ['method', 'status', 'path'],
      this._service.defaultBuckets,
    );
  }

  use(req: FastifyRequest, res: FastifyReply, next) {
    responseTime((req: FastifyRequest, res: FastifyReply, time: number) => {
      const { url, method } = req;

      const labels = {
        method,
        status: res.statusCode.toString(),
        path: url.split('?')[0],
      };

      if (url !== '/metrics') {
        this._histogram.observe(labels, time / 1000);
      }
    })(req, res, next);
  }
}
