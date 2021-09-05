import { DUser } from '../../models/user.model';

export interface ClassicTokenStrategyDataProvider {
  validate(token: string): Promise<DUser | null>;
}
