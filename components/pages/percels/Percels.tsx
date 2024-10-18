"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Topper from "@/components/custom/Topper";
import UITabs from "@/components/custom/UITabs";
import AddParcelSheet from "./AddParcelSheet";
import { useGlobal } from "@/context/GlobalContext";
import { IParcel } from "@/models/Parcel";
import { Badge } from "@/components/ui/badge";

export default function Parcels() {
  const { parcels } = useGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(parcels);
  const [isAddParcelSheetOpen, setIsAddParcelSheetOpen] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, parcels]);

  const handleSearch = () => {
    const filtered = parcels.filter(
      (parcel: IParcel) =>
        parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.senderId?.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        parcel.recipientId?.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredParcels(filtered);
  };

  const ParcelTable = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      <Table className="bg-white dark:bg-gray-900">
        <TableHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 dark:border-none">
          <TableRow>
            <TableHead>Parcel ID</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Price(KES)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParcels.map((parcel: IParcel) => (
            <TableRow key={parcel.name}>
              <TableCell>{parcel.name}</TableCell>
              <TableCell>{parcel.senderId?.username}</TableCell>
              <TableCell>{parcel.recipientId?.username}</TableCell>
              <TableCell>
                <Badge variant="secondary"> KES {parcel.price}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const tabs = [
    {
      value: "all",
      label: "All Parcels",
      content: <ParcelTable />,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Parcel Management"
        description="Welcome to the Parcel Management dashboard. Here you can track, manage, and analyze all customer parcels efficiently. Use the tools below to search for specific parcels, filter by status, and get an overview of your business performance."
        icon={Package}
        image="/images/cargo1.jpg"
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Parcels Overview
        </h2>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          onClick={() => setIsAddParcelSheetOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Parcel
        </Button>
      </div>

      {/* Search Section */}
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Search parcels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs Section */}
      <UITabs tabs={tabs} defaultValue="all" />
      <AddParcelSheet
        isOpen={isAddParcelSheetOpen}
        onClose={() => setIsAddParcelSheetOpen(false)}
      />
    </div>
  );
}
