/**
 * 🔢 UNIVERSAL NUMBER FORMATTER
 * Converts numbers to the correct numbering system (Arabic-Indic vs Latin)
 * based on the active locale.
 */

export const getNumberFormatOptions = (locale: string) => {
  return {
    numberingSystem: locale === "ar" ? "arab" : "latn",
    useGrouping: false, // Prevents 1,000 formatting if not wanted, or keep true for thousands
  } as const;
};

export const formatNumber = (value: number | string, locale: string) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return value;

  return new Intl.NumberFormat(locale, getNumberFormatOptions(locale)).format(
    num
  );
};
