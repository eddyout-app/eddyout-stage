import { normalizeDateKey } from "./normalizeDateKey";

export function groupByDate<
  T extends { date: string | Date; startDate?: string | Date }
>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {};

  items.forEach((item) => {
    const dateKey = item.date
      ? normalizeDateKey(item.date)
      : normalizeDateKey(item.startDate!); // for Campsites

    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(item);
  });

  return grouped;
}
