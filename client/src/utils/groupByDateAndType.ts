import { normalizeDateKey } from "./normalizeDateKey";

export function groupByDateAndType<
  T extends { date: string | Date; mealType?: string; itemType?: string }
>(items: T[]): Record<string, Record<string, T>> {
  const grouped: Record<string, Record<string, T>> = {};

  items.forEach((item) => {
    const dateKey = normalizeDateKey(item.date);
    const typeKey = item.mealType ?? item.itemType ?? "UnknownType";

    if (!grouped[dateKey]) grouped[dateKey] = {};
    grouped[dateKey][typeKey] = item;
  });

  return grouped;
}
