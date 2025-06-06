import GearCatalogSection from "./GearCatalogSection";

export default function GearCatalogManager() {
  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Gear Catalog Manager
      </h1>

      <GearCatalogSection />
    </div>
  );
}
