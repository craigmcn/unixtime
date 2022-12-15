import { useEffect, useState } from 'react';
import { IConversion, IFormData } from '../types';
import { convertTime } from '../functions/convertTime';
import { UTC, NOW } from '../constants';
import moment from 'moment';

const useConversion = () => {
  const params = new URLSearchParams(window.location.search);
  const initialData = {time: params.get('time') || NOW, timezone: params.get('timezone') || UTC};
  const [conversion, setConversion] = useState<IFormData>(initialData);
  const [data, setData] = useState<IConversion>({ ...initialData, momentDate: moment(), title: '' });

  useEffect(() => {
    const { time, timezone: convertTimezone } = conversion || {} as IFormData;
    const {
      momentDate,
      timezone,
      error,
      warning,
      title,
    } = convertTime(time, convertTimezone);

    setData({ momentDate, time, timezone, error, warning, title });
  }, [conversion]);

  return { data, setConversion };
};

export default useConversion;
