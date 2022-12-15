export interface IFormData {
  time: string;
  timezone?: string;
}

export interface IValue {
  value: string;
  label: string;
}

export interface IConversion {
  momentDate: moment.Moment,
  time: number | string,
  timezone?: string,
  error?: string,
  warning?: string,
  title?: string;
}
