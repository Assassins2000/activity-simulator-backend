import { DUser } from '@app/domains/models';
import { DBaseModel } from '@app/domains/models/base.model';

interface KeyConfig {
  readonly hideValue?: boolean;
  readonly hideField?: boolean;
  formate?(fieldValue: unknown): unknown;
}

export interface KeysConfig {
  readonly [name: string]: KeyConfig;
}

export abstract class BaseMapper<D_MODEL extends DBaseModel> {
  protected readonly originalObject: Record<string, unknown>;
  private readonly typesAndDefaultValues: Record<string, unknown> = {
    number: 0,
    string: '',
    object: {},
    array: [],
  };

  constructor(originalObject: Record<string, unknown>, keysConfig?: KeysConfig) {
    this.originalObject = originalObject;
    if (keysConfig) {
      Object.entries(originalObject).forEach(([key, value]) => {
        if (keysConfig[key]) {
          if (keysConfig[key].hideValue) {
            this.originalObject[key] = this.hideValueField(value);
          } else if (keysConfig[key].hideField) {
            delete this.originalObject[key];
          } else if (keysConfig[key].formate) {
            this.originalObject[key] = (keysConfig[key].formate as (fieldValue: unknown) => unknown)(value);
          }
        }
      });
    } else {
      this.originalObject = originalObject;
    }
  }

  private hideValueField(value: unknown): unknown {
    if (typeof value === 'object' && Array.isArray(value)) {
      return this.typesAndDefaultValues.array;
    }
    return this.typesAndDefaultValues[typeof value];
  }

  public abstract toDomainModel(): D_MODEL;
}
