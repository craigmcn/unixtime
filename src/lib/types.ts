export interface IFormData {
  time: string;
  timezone?: string;
}

export interface IValue {
  value: string;
  label: string;
}

import type { Dayjs } from 'dayjs';

export interface IConversion {
  dateTime: Dayjs;
  time: number | string;
  timezone?: string;
  error?: string;
  warning?: string;
  title?: string;
}
