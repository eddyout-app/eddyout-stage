type SaveOptions<T> = {
  item: T;
  isUnclaimed: (item: T) => boolean;
  addMutation: any;
  updateMutation: any;
  addVariables: (item: T) => any;
  updateVariables: (item: T) => any;
  refetchQueries: any[];
  onSave: (updatedItem: T) => void;
  onClose: () => void;
};

export async function handleSave<T>({
  item,
  isUnclaimed,
  addMutation,
  updateMutation,
  addVariables,
  updateVariables,
  refetchQueries,
  onSave,
  onClose,
}: SaveOptions<T>) {
  try {
    let updatedItem: T;

    if (isUnclaimed(item)) {
      const result = await addMutation({
        variables: addVariables(item),
        refetchQueries,
      });
      updatedItem = result.data[Object.keys(result.data)[0]];
    } else {
      const result = await updateMutation({
        variables: updateVariables(item),
        refetchQueries,
      });
      updatedItem = result.data[Object.keys(result.data)[0]];
    }

    onSave(updatedItem);
    onClose();
  } catch (err) {
    console.error("Error saving item:", err);
  }
}
