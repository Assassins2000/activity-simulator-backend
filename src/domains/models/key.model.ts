import { DBaseModel } from './base.model';

enum KeyTypes {
  Keyboard = 'keyboard',
  Mouse = 'mouse',
}

export class DKey extends DBaseModel {
  constructor(private readonly _type: KeyTypes, private readonly _name: string, id?: string) {
    super(id);
  }
}
