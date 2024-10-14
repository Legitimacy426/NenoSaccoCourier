"use client";

import { useState } from "react";
import { Package, Plus } from "lucide-react";
import Topper from "@/components/custom/Topper";
import UITabs from "@/components/custom/UITabs"; // Import UITabs component
import UITable from "@/components/custom/UITable"; // Import UITable component
import { Button } from "@/components/ui/button";
import AddParcelTypeSheet from "./AddParcelTypeSheet"; // Adjust the import path as necessary

// Initial parcel types data
const initialParcelTypes = [
  {
    id: 1,
    name: "Standard",
    description: "Regular parcel delivery",
    price: 10,
  },
  { id: 2, name: "Express", description: "Fast delivery option", price: 20 },
  { id: 3, name: "Oversized", description: "For large items", price: 30 },
];

export default function ParcelTypes() {
  const [parcelTypes] = useState(initialParcelTypes);
  const [isAddParcelTypeSheetOpen, setIsAddParcelTypeSheetOpen] =
    useState(false); // State for sheet visibility

  // Columns for UITable
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Price", accessor: "price" },
  ];

  // Tabs content for UITabs
  const tabs = [
    {
      value: "overview",
      label: "Parcel Types ",
      content: (
        <div>
          <UITable columns={columns} data={parcelTypes} />
        </div>
      ),
    },
    {
      value: "pricing",
      label: "Pricing",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Pricing Information</h2>
          <p>Here you can display additional pricing information or details.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Parcel Types"
        description="View different types of parcels, their descriptions, and pricing."
        icon={Package}
        image="/images/parcel.jpg"
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Overview
        </h2>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          onClick={() => setIsAddParcelTypeSheetOpen(true)} // Open the sheet on click
        >
          <Plus className="mr-2 h-4 w-4" /> Add Parcel Type
        </Button>
      </div>

      {/* Use UITabs for organizing the tabs */}
      <UITabs defaultValue="overview" tabs={tabs} />

      {/* AddParcelTypeSheet to create a new parcel type */}
      <AddParcelTypeSheet
        isOpen={isAddParcelTypeSheetOpen}
        onClose={() => setIsAddParcelTypeSheetOpen(false)} // Close the sheet on close
      />
    </div>
  );
}
