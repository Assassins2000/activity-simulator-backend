import { SubRoutes } from './subRoutes.interface';

export interface RoutingSchema<T> {
  readonly base: string;
  readonly sub: SubRoutes<T>[];
}
