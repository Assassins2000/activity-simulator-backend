import { SimpleOptionsEnum } from './simpleOptions.enum';

interface KeyConfig {
  options?: SimpleOptionsEnum[];
  formate?(fieldValue: unknown): unknown;
}

export interface KeysConfig {
  readonly [name: string]: KeyConfig;
}
