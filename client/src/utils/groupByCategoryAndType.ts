export function groupByCategoryAndType<
  T extends { category: string; itemType: string }
>(items: T[]): Record<string, Record<string, T>> {
  const grouped: Record<string, Record<string, T>> = {};

  items.forEach((item) => {
    const categoryKey = item.category;
    if (!grouped[categoryKey]) grouped[categoryKey] = {};
    grouped[categoryKey][item.itemType] = item;
  });

  return grouped;
}
