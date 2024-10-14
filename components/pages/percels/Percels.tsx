// Parcels.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Search,
  Filter,
  Plus,
  Truck,
  CheckCircle,
} from "lucide-react";
import Topper from "@/components/custom/Topper";
import UITabs from "@/components/custom/UITabs"; // Import the UITabs component
import UITable from "@/components/custom/UITable"; // Import the new UITable component
import AddParcelSheet from "./AddParcelSheet";

const parcels = [
  {
    id: "P001",
    sender: "John Doe",
    recipient: "Jane Smith",
    status: "pending",
    location: "Nairobi",
    estimatedDelivery: "2023-05-15",
  },
  {
    id: "P002",
    sender: "Alice Johnson",
    recipient: "Bob Williams",
    status: "delivered",
    location: "Mombasa",
    estimatedDelivery: "2023-05-10",
  },
  {
    id: "P003",
    sender: "Eva Brown",
    recipient: "Michael Davis",
    status: "Processing",
    location: "Kisumu",
    estimatedDelivery: "2023-05-18",
  },
  {
    id: "P004",
    sender: "David Wilson",
    recipient: "Sarah Taylor",
    status: "Out for Delivery",
    location: "Nakuru",
    estimatedDelivery: "2023-05-14",
  },
];

export default function Parcels() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(parcels);
  const [isAddParcelSheetOpen, setIsAddParcelSheetOpen] = useState(false);
  const handleSearch = () => {
    const filtered = parcels.filter(
      (parcel) =>
        parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParcels(filtered);
  };

  const columns = [
    { header: "Parcel ID", accessor: "id" },
    { header: "Sender", accessor: "sender" },
    { header: "Recipient", accessor: "recipient" },
    { header: "Status", accessor: "status", badge: true },
    { header: "Current Location", accessor: "location" },
    { header: "Estimated Delivery", accessor: "estimatedDelivery" },
  ];

  const tabs = [
    {
      value: "all",
      label: "All Parcels",
      content: <UITable columns={columns} data={filteredParcels} />,
    },
    {
      value: "inTransit",
      label: "In Transit",
      content: (
        <UITable
          columns={columns}
          data={filteredParcels.filter((p) => p.status === "In Transit")}
        />
      ),
    },
    {
      value: "delivered",
      label: "Delivered",
      content: (
        <UITable
          columns={columns}
          data={filteredParcels.filter((p) => p.status === "Delivered")}
        />
      ),
    },
    {
      value: "processing",
      label: "Processing",
      content: (
        <UITable
          columns={columns}
          data={filteredParcels.filter((p) => p.status === "Processing")}
        />
      ),
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Parcel Management"
        description="Welcome to the Parcel Management dashboard. Here you can track, manage, and analyze all customer parcels efficiently. Use the tools below to search for specific parcels, filter by status, and get an overview of your business performance."
        icon={Package}
        image="/images/cargo1.jpg" // Adjust the image path as necessary
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Parcels Overview
        </h2>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" onClick={() => setIsAddParcelSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Parcel
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Cards for Total Parcels, In Transit, Processing, Delivered */}
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Parcels</CardTitle>
            <Package className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{parcels.length}</div>
            <p className="text-sm opacity-80 flex items-center">
              <span>20.1% from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-teal-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">In Transit</CardTitle>
            <Truck className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {parcels.filter((p) => p.status === "In Transit").length}
            </div>
            <p className="text-sm opacity-80 flex items-center">
              <span>12.5% from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Processing</CardTitle>
            <Package className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {parcels.filter((p) => p.status === "Processing").length}
            </div>
            <p className="text-sm opacity-80 flex items-center">
              <span>5.2% from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Delivered</CardTitle>
            <CheckCircle className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {parcels.filter((p) => p.status === "Delivered").length}
            </div>
            <p className="text-sm opacity-80 flex items-center">
              <span>15.4% from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
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
        <Button>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs Section */}
      <UITabs tabs={tabs} defaultValue="all" />
      <AddParcelSheet isOpen={isAddParcelSheetOpen} onClose={() => setIsAddParcelSheetOpen(false)} />
    </div>
  );
}
