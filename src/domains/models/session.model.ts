import { DBaseModel } from './base.model';
import { DUser } from './user.model';

export class DSession extends DBaseModel {
  constructor(
    private readonly _user: string | DUser,
    private readonly _startDate?: Date,
    private readonly _endDate?: Date,
    private readonly _closing?: boolean,
    id?: string,
  ) {
    super(id);
  }
}
