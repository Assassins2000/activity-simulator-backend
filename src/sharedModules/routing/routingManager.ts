import { RoutingSchema } from './types/routingSchema.interface';

export class RoutingManager<C> {
  constructor(private readonly routingSchema: RoutingSchema<C>) {}

  get basePath(): string {
    return `${this.routingSchema.base}/`;
  }

  public getSubPath(component: C, param?: string): string {
    const sub = this.routingSchema.sub.find(s => s.component === component);
    if (sub) {
      return param ? `${sub.path}/:${param}` : sub.path;
    }
    throw new Error('Sub route no found');
  }
}
