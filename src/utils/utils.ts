/**
 * Calculates the date that was a specified number of days before the current date.
 * @param days - The number of days to go back from today.
 * @returns The calculated Date object
 */
export const getDateDaysAgoAsISO = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

/** It's format method, formats a number to USD currency separated with "," and a "." for decimals */
export const currencyFormatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const isWindowLessThan = (width: number) => window.innerWidth < width;
