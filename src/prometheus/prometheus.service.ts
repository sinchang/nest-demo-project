// Credit by hhttps://github.com/Itchimonji/healthchecks-with-nestjs-app

import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Histogram, Registry } from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

interface MapHistogram {
  [key: string]: Histogram<string>;
}

@Injectable()
export class PrometheusService {
  private registeredMetrics: MapHistogram = {};
  private readonly registry: Registry;

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  public get defaultBuckets(): number[] {
    return [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 10];
  }

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });
  }

  public registerMetrics(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[],
  ): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  public removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  public clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }
}
