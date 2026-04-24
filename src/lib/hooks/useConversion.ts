import { useEffect, useState } from 'react';
import { IConversion, IFormData } from '../types';
import { convertTime } from '../functions/convertTime';
import { UTC, NOW } from '../constants';
import dayjs from '../dayjs';

const useConversion = () => {
  const [conversion, setConversion] = useState<IFormData>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      time: params.get('time') || NOW,
      timezone: params.get('timezone') || UTC,
    };
  });
  const [data, setData] = useState<IConversion>({
    time: NOW,
    timezone: UTC,
    dateTime: dayjs(),
    title: '',
  });

  useEffect(() => {
    const { time, timezone: convertTimezone } = conversion || ({} as IFormData);
    const { dateTime, time: convertedTime, timezone, error, warning, title } =
      convertTime(time, convertTimezone);

    setData({ dateTime, time: convertedTime, timezone, error, warning, title });
  }, [conversion]);

  return { data, setConversion };
};

export default useConversion;
