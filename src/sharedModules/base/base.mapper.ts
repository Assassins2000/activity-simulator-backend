import { DBaseModel } from '@app/domains/models/base.model';
import { KeysConfig, SimpleOptionsEnum } from './types';

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
          const options = keysConfig[key].options;
          options?.forEach(optKey => {
            switch (optKey) {
              case SimpleOptionsEnum.HideValue:
                this.originalObject[key] = this.hideValueField(value);
                break;
              case SimpleOptionsEnum.HideField:
                delete this.originalObject[key];
                break;
              default:
                console.log();
            }
          });
          this.originalObject[key] = keysConfig[key].formate?.(value);
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
