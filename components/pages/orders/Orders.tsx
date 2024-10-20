"use client";

import { useState, useEffect } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Package,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit2,
} from "lucide-react";
import Topper from "@/components/custom/Topper";
import AddOrderSheet from "./AddOrderSheet";
import EditOrderSheet from "./EditOrderSheet"; // Import EditOrderSheet
import { useGlobal } from "@/context/GlobalContext";
import { IOrder } from "@/models/Order";

enum OrderStatus {
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export default function Orders() {
  const { orders } = useGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // State for EditOrderSheet
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null); // Selected order for editing

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        (order.trackingNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          order.customer?.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (statusFilter === "All" || order.status === statusFilter)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const totalRevenue = orders
    .filter((order) => order.status === OrderStatus.Delivered)
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const completedOrders = orders.filter(
    (order) => order.status === OrderStatus.Delivered
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === OrderStatus.Processing
  ).length;

  // Open EditOrderSheet and set the selected order
  const handleEdit = (order: IOrder) => {
    setSelectedOrder(order);
    setIsEditOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Order Management"
        description="Welcome to the Order Management dashboard. Here you can track, manage, and analyze all customer orders efficiently. Use the tools below to search for specific orders, filter by status, and get an overview of your business performance."
        icon={ShoppingBag}
        image="/images/cargo1.jpg"
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Orders Overview
        </h2>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          onClick={() => setIsOpen(true)}
        >
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
            <div className="text-xl font-bold">
              KES{totalRevenue.toFixed(2)}
            </div>
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
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as OrderStatus | "All")
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {Object.values(OrderStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <Table className="bg-white dark:bg-gray-900">
          <TableHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 dark:border-none">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>{" "}
              {/* New Actions column */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id as string}>
                <TableCell>{order.trackingNumber}</TableCell>
                <TableCell>{order.customer?.username}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.estimatedDeliveryDate).toDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === OrderStatus.Delivered
                        ? "secondary"
                        : order.status === OrderStatus.Shipped
                        ? "destructive"
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  KES {order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(order)}
                    className="text-sm"
                  >
                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddOrderSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {selectedOrder && (
        <EditOrderSheet
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          order={selectedOrder} // Pass the selected order for editing
        />
      )}
    </div>
  );
}
