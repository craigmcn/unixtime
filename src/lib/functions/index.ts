import { NOW } from "../constants";
import { IConversion } from "../types";

export const getRequestUrl = ({
  time,
  timezone,
  dateTime,
}: IConversion): string => {
  const currentUrl = new URL(window.location.href);

  const add_params = {
    time:
      (time as string).toLowerCase() === NOW || !dateTime
        ? NOW
        : dateTime.unix().toString(),
    timezone: timezone || "",
  };
  const new_params = new URLSearchParams(Object.entries(add_params)).toString();

  return new URL(
    `${currentUrl.origin}${currentUrl.pathname}?${new_params}`,
  ).toString();
};
