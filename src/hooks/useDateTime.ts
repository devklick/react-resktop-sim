import { useEffect, useState } from "react";

// TODO: Add support to escape date part identifiers
// TODO: Add support for 24 hour time
// TODO: Add support for timezones
// TODO: Add support for date part names (e.g. Friday 1st January)

type UnitOfTime =
  | "year"
  | "month"
  | "date"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";

const DatePartIds: Record<UnitOfTime, string> = {
  year: "y",
  month: "M",
  date: "d",
  hour: "h",
  minute: "m",
  second: "s",
  millisecond: "f",
} as const;

const allDatePartIds = new Set<string>(Object.values(DatePartIds));

type DatePartId = (typeof DatePartIds)[keyof typeof DatePartIds];

function isDatePartId(value: unknown): value is DatePartId {
  return typeof value === "string" && allDatePartIds.has(value);
}

function getDateParts(date: Date): Record<DatePartId, number> {
  return {
    y: date.getFullYear(),
    M: date.getMonth(),
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    f: date.getMilliseconds(),
  };
}

function safeGetAtIndex(value: string, i: number, defaultValue = "0") {
  return value[i] ?? defaultValue;
}

function formatDate(date: Date, template: string) {
  const dateParts = getDateParts(date);
  const parts = template.split("").reduce((result, templatePart, i, parts) => {
    if (!isDatePartId(templatePart)) {
      result.push([templatePart]);
      return result;
    }

    let datePartNegativeI = 0;
    if (templatePart === parts[i - 1]) {
      datePartNegativeI = result[result.length - 1].length;
    } else {
      result.push([]);
    }

    const datePartStr = dateParts[templatePart].toString();
    const char = safeGetAtIndex(
      datePartStr,
      datePartStr.length - datePartNegativeI - 1
    );

    result[Math.max(result.length - 1)].unshift(char);
    return result;
  }, Array<Array<string>>());

  return parts.flatMap((p) => p.join("")).join("");
}

interface DateTimeProps {
  /**
   * Controls how frequently the returned date/time information will be updated.
   *
   * E.g. a value of `1`, combined with a `tickFrequencyUnit` of `second`, will
   * cause the returned date information to be updated every second.
   */
  tickFrequency?: number;
  /**
   * Controls how frequently the returned date/time information will be updated.
   *
   * E.g. a value of `second`, combined with a `tickFrequency` of `1`, will
   * cause the returned date information to be updated every second.
   */
  tickFrequencyUnit?: UnitOfTime;
  /**
   * Allows a custom formatting of the returned date and time.
   *
   * Date part identifiers:
   *  - `y` - year
   *  - `M` - month
   *  - `d` - date
   *  - `h` - hour
   *  - `m` - minute
   *  - `s` - second
   *  - `f` - millisecond
   *
   * Any characters which are *not* date part identifiers will be left in
   * place and appear in the same location on the formatted string.
   *
   * The number of sequential date part identifiers is important. They represent
   * the number length of data to be extracted from the date part. Note that
   * the length is in reverse order; if there is one sequential date part
   * identifiers, only the last piece of the date part will be extracted. If
   * there are two sequential date part identifiers, the last two characters
   * from the date part will be extracted, etc. If there are more sequential
   * date part identifiers than there are characters in the date part
   * (e.g. yyyyy > 2023), the formatted date part will be padded with zeros to
   * match the length of the sequence of date part identifiers
   * of parts that will be extracted from the date part in question
   *
   * @example "yyyy/MM/dd hh:mm:ss.fff"
   *  // returns "2023/09/19 21:31:59.673"
   *
   * @example "yyyyyy/MM/dd"
   *  // returns "002023/09/19"
   */
  template?: string;
}

function useDateTime(
  {
    tickFrequency = 1,
    tickFrequencyUnit = "second",
    template = "hh:mm:ss",
  }: DateTimeProps = {
    tickFrequency: 1,
    tickFrequencyUnit: "second",
    template: "hh:mm:ss",
  }
) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => {
      const now = new Date();
      const diff =
        Number(getDateParts(now)[DatePartIds[tickFrequencyUnit]]) -
        Number(getDateParts(dateTime)[DatePartIds[tickFrequencyUnit]]);
      if (Math.abs(diff) >= tickFrequency) {
        setDateTime(now);
      }
    }, 1);
    return () => clearInterval(i);
  });

  return {
    year: dateTime.getFullYear(),
    month: dateTime.getMonth(),
    date: dateTime.getDate(),
    hour: dateTime.getHours(),
    minute: dateTime.getMinutes(),
    second: dateTime.getSeconds(),
    millisecond: dateTime.getMilliseconds(),
    formatted: formatDate(dateTime, template),
  };
}

export default useDateTime;
