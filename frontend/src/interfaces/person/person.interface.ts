import { ValidityStatus } from '../validity-status/validity-status.type';
import { Detail } from '../detail/detail.interface';

export interface Person {
  name: string;
  profession: string;
  transcript: string;
  emotions: 'Neutral' | 'Stress';
  audioFileUrl: string;
  text2highlight: string[];
  validityStatus: ValidityStatus;
  details: Detail[];
  delay: number;
  interval: number;
}
