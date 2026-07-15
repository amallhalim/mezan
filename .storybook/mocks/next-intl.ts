// Mock for next-intl module
export const useLocale = () => "en";
export const useTranslations = () => (key: string) => key;
export const useFormatter = () => ({
  dateTime: (date: Date) => date.toLocaleDateString("en-US"),
  number: (value: number) => String(value),
  relativeTime: () => "now",
});
export const NextIntlClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => children;
