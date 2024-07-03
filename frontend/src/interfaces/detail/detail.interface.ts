import { ValidityStatus } from '../validity-status/validity-status.type';

export interface Detail {
  name: string;
  value: string;
  validityStatus: ValidityStatus;
}
