"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Package,
  TrendingUp,
  Filter,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import Topper from "@/components/custom/Topper";
import UITabs from "@/components/custom/UITabs";
import UITable from "@/components/custom/UITable";
import AddOrderSheet from "./AddOrderSheet";

const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2023-05-15",
    status: "Completed",
    total: 120.5,
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2023-05-16",
    status: "Processing",
    total: 85.0,
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    date: "2023-05-17",
    status: "Shipped",
    total: 200.75,
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    date: "2023-05-18",
    status: "Pending",
    total: 150.25,
  },
  {
    id: "ORD005",
    customer: "Charlie Davis",
    date: "2023-05-19",
    status: "Completed",
    total: 95.5,
  },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const columns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    { header: "Date", accessor: "date" },
    { header: "Status", accessor: "status", badge: true },
    { header: "Total", accessor: "total" },
  ];

  const tabs = [
    {
      value: "allOrders",
      label: "All",
      content: <UITable columns={columns} data={filteredOrders} />,
    },
    {
      value: "completedOrders",
      label: "Completed ",
      content: (
        <UITable
          columns={columns}
          data={filteredOrders.filter((order) => order.status === "Completed")}
        />
      ),
    },
    {
      value: "processingOrders",
      label: "Processing",
      content: (
        <UITable
          columns={columns}
          data={filteredOrders.filter((order) => order.status === "Processing")}
        />
      ),
    },
    {
      value: "shippedOrders",
      label: "Shipped ",
      content: (
        <UITable
          columns={columns}
          data={filteredOrders.filter((order) => order.status === "Shipped")}
        />
      ),
    },
    {
      value: "pendingOrders",
      label: "Pending ",
      content: (
        <UITable
          columns={columns}
          data={filteredOrders.filter((order) => order.status === "Pending")}
        />
      ),
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Order Management"
        description="Welcome to the Order Management dashboard. Here you can track, manage, and analyze all customer orders efficiently. Use the tools below to search for specific orders, filter by status, and get an overview of your business performance."
        icon={ShoppingBag}
        image="/images/cargo1.jpg" // Adjust the image path as necessary
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Orders Overview
        </h2>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              10.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Completed Orders
            </CardTitle>
            <Package className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedOrders}</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              5.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Pending Orders
            </CardTitle>
            <TrendingUp className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingOrders}</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              2.1% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button
             
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              <Filter className="mr-2 h-4 w-4" /> More Filters
            </Button>
      </div>

      {/* Tabs Section */}
      <UITabs tabs={tabs} defaultValue="allOrders" />
      <AddOrderSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
