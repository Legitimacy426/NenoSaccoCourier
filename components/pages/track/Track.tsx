"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Search,
  Box,
  MapPin,
  XCircle,
  Calendar,
  DollarSign,

} from "lucide-react";
import Topper from "@/components/custom/Topper";
import { useGlobal } from "@/context/GlobalContext";
import { IOrder, OrderStatus } from "@/models/Order";

const states = [
  { id: 1, name: "Order Placed", icon: Package },
  { id: 2, name: "Processing", icon: Box },
  { id: 3, name: "Shipped", icon: Truck },
  { id: 4, name: "Out for Delivery", icon: MapPin },
  { id: 5, name: "Delivered", icon: CheckCircle },
];

export default function OrderTracking() {
  const { orders } = useGlobal();
  const [orderId, setOrderId] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const findStateForStatus = (status: string) => {
    const state = states.find(
      (state) => state.name.toLowerCase() === status.toLowerCase()
    );
    return state ? state.name : "";
  };

  const handleTrack = () => {
    if (orderId.trim() === "") {
      setError("Please enter a valid Order ID or select an existing order.");
      return;
    }

    const order = orders.find(
      (order: IOrder) => order.trackingNumber === orderId
    );
    if (!order) {
      setSelectedOrder(null);
      setError("Order not found. Please check the Order ID.");
      return;
    }

    setError("");
    setIsTracking(true);
    setSelectedOrder(order);

    setTimeout(() => {
      const orderStatus = order.status;
      const state = findStateForStatus(orderStatus);

      if (state) {
        setCurrentState(state);
      } else {
        setError("Could not determine the current state for this order.");
      }

      setIsTracking(false);
    }, 1500);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Topper
        title="Order Tracking"
        description="Track your orders and get updates on their status."
        icon={MapPin}
        image="/images/cargo2.jpg"
      />

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-700">
            Track Your Order
          </CardTitle>
          <CardDescription>
            Enter your order ID or select from your recent orders to track your
            package.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full text-foreground bg-background"
              />
            </div>
            <div className="w-full md:w-64">
              <Select onValueChange={(value) => setOrderId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select existing order" />
                </SelectTrigger>
                <SelectContent className="bg-background text-foreground dark:bg-gray-800 dark:text-white">
                  {orders.map((order) => (
                    <SelectItem
                      key={order.trackingNumber}
                      value={order.trackingNumber}
                    >
                      {order.trackingNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleTrack}
              disabled={isTracking}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {isTracking ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Search className="mr-2 h-4 w-4 text-white" />
              )}
              {isTracking ? "Tracking..." : "Track Order"}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}

          {currentState && selectedOrder && (
            <div className="space-y-6">
              {/* Enhanced additional order information */}
              <Card className=" border-2  dark:border-gray-700  dark:bg-bg-gradient-to-br from-gray-700 to-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-purple-700 dark:text-purple-400 ">
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Carrier
                      </p>
                      <p className="font-medium">{selectedOrder.carrier}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Estimated Delivery
                      </p>
                      <p className="font-medium">
                        {formatDate(selectedOrder.estimatedDeliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Amount
                      </p>
                      <p className="font-medium">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-6 w-6 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Shipping Price
                      </p>
                      <p className="font-medium">
                        ${selectedOrder.shippingPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedOrder.status === OrderStatus.Cancelled ? (
                <div className="text-red-500 text-lg flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <XCircle className="mr-2 h-6 w-6" />
                  This order has been cancelled.
                </div>
              ) : (
                <div className="space-y-4">
                  {states.map((state, index) => {
                    const currentIndex = states.findIndex(
                      (s) => s.name === currentState
                    );
                    const isCurrentState = index === currentIndex;
                    const isPastState = index <= currentIndex;

                    return (
                      <motion.div
                        key={state.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center space-x-4 ${
                          isPastState
                            ? "text-purple-700 dark:text-purple-400"
                            : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        <div className="relative">
                          <state.icon
                            className={`h-8 w-8 ${
                              isPastState
                                ? "text-purple-700 dark:text-purple-400"
                                : "text-gray-400 dark:text-gray-600"
                            }`}
                          />
                          {index < states.length - 1 && (
                            <div
                              className={`absolute top-full left-1/2 w-0.5 h-full transform -translate-x-1/2 ${
                                isPastState
                                  ? "bg-purple-700 dark:bg-purple-400"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{state.name}</p>
                          {isCurrentState && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Current Status
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500 dark:text-gray-400">
          For any issues, please contact our customer support at
          support@example.com
        </CardFooter>
      </Card>
    </div>
  );
}
