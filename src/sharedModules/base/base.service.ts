export abstract class BaseService {
  abstract run(...params: unknown[]): unknown | Promise<unknown>;
}
