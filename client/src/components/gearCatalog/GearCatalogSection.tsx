import { useQuery, useMutation } from "@apollo/client";
import { GET_GEAR_CATALOG_ITEMS } from "../../graphql/queries/gearQueries";
import { DELETE_GEAR_CATALOG_ITEM } from "../../graphql/mutations/gearMutations";
import { GearCatalogItemData } from "../../types/gear";
import { useState } from "react";
import GearCatalogModal from "./GearCatalogModal";

export default function GearCatalogSection() {
  const {
    data: catalogData,
    loading,
    error,
    refetch,
  } = useQuery(GET_GEAR_CATALOG_ITEMS);

  const [deleteGearCatalogItem] = useMutation(DELETE_GEAR_CATALOG_ITEM);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<GearCatalogItemData | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this catalog item?")) {
      await deleteGearCatalogItem({
        variables: { id },
        refetchQueries: [{ query: GET_GEAR_CATALOG_ITEMS }],
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading catalog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-body text-lg">
        Error loading catalog: {error.message}
      </div>
    );
  }

  const catalogItems: GearCatalogItemData[] =
    catalogData?.gearCatalogItems || [];

  return (
    <>
      <div className="flex justify-center mb-6">
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Add Catalog Item
        </button>
      </div>

      <div className="overflow-y-auto max-h-[70vh] pr-2 mx-auto">
        <div className="grid grid-cols-6 gap-4 text-center font-semibold mb-2 border-b border-gray-400 pb-2">
          <div>Item Name</div>
          <div>Category</div>
          <div>Per Person Qty</div>
          <div>Unit</div>
          <div>Notes</div>
          <div>Action</div>
        </div>

        {catalogItems.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-6 gap-4 items-center text-center py-2 border-b border-gray-200"
          >
            <div>{item.itemName}</div>
            <div>{item.category}</div>
            <div>{item.perPersonQty}</div>
            <div>{item.unit}</div>
            <div>{item.notes}</div>
            <div className="flex justify-center space-x-2">
              <button className="btn-action" onClick={() => setEditItem(item)}>
                Edit
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showModal || editItem) && (
        <GearCatalogModal
          item={editItem}
          onClose={() => {
            setShowModal(false);
            setEditItem(null);
          }}
          onSave={async () => {
            await refetch();
            setShowModal(false);
            setEditItem(null);
          }}
        />
      )}
    </>
  );
}
