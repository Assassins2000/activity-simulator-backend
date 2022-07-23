import { DKey } from './key.model';
import { DBaseModel } from './base.model';

enum KeystrokeTypes {
  Keyboard = 'keyboard',
  Mouse = 'mouse',
}

export class DKeystroke extends DBaseModel {
  constructor(
    private readonly _type: KeystrokeTypes,
    private readonly _key: DKey,
    private readonly _endDate?: Date,
    private readonly _closing?: boolean,
    id?: string,
  ) {
    super(id);
  }
}
