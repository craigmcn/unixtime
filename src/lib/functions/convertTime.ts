import * as chrono from "chrono-node";
import dayjs from "../dayjs";
import { IConversion } from "../types";
import { NOW, UTC } from "../constants";

export const convertTime = (
  submitTime: number | string,
  submitTimezone?: string,
): IConversion => {
  const defaultDate = new Date();
  let time;
  let numericTime;
  let dateTime;
  let chronoTime;
  let error;
  let warning;
  let title = "Converted time";
  let timezone = submitTimezone || UTC;

  if (submitTime) {
    time = submitTime;
    numericTime = Number(time);
  } else {
    const d = new Date();
    numericTime = time = d.getTime();
    title = "Current time";
  }

  if (
    !timezone ||
    (!Intl.supportedValuesOf("timeZone").includes(timezone) && timezone !== UTC)
  ) {
    warning = timezone ? "Invalid timezone provided. Switched to UTC." : "";
    timezone = UTC;
  }

  if (isNaN(numericTime)) {
    const nowRegex = /^[now();?]+$/i; // for `now()` no offset calculation is required
    const timeIsNow = !!(time as string)?.match(nowRegex);
    const parsingReference = timeIsNow ? {} : { timezone: 0 };

    chronoTime = chrono.parse(time as string, parsingReference, {
      forwardDate: true,
    });
    if (chronoTime[0]) {
      dateTime = dayjs(chronoTime[0].start.date());
      if (timezone && timezone !== UTC) {
        const dateUtc = Date.UTC(
          chronoTime[0].start.get("year") || defaultDate.getFullYear(),
          // @ts-expect-error: Object is possibly 'null'.
          chronoTime[0].start.get("month") - 1 || defaultDate.getMonth(),
          chronoTime[0].start.get("day") || 1,
          chronoTime[0].start.get("hour") || 0,
          chronoTime[0].start.get("minute") || 0,
          chronoTime[0].start.get("second") || 0,
        );
        // utcOffset() returns minutes east of UTC; moment-timezone's parse()
        // returned minutes west, so negate before applying to the unix calc.
        const timezoneOffset = -dayjs(dateUtc).tz(timezone).utcOffset();
        dateTime = dayjs.unix(
          dateTime.unix() + (timeIsNow ? 0 : timezoneOffset * 60),
        );
      }
    } else {
      error = "Invalid time provided. Switched to current time.";
      dateTime = dayjs().tz(timezone || UTC);
    }
  } else {
    if (numericTime >= 1e10 && numericTime < 1e13) numericTime /= 1e3; // milliseconds
    if (numericTime >= 1e13 && numericTime < 1e16) numericTime /= 1e6; // microseconds
    if (numericTime >= 1e16 && numericTime < 1e19) numericTime /= 1e9; // nanoseconds
    dateTime = dayjs.unix(numericTime);
  }
  return {
    dateTime,
    time: time || NOW,
    timezone,
    error,
    warning,
    title,
  };
};
