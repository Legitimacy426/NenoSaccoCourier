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
} from "lucide-react";
import Topper from "@/components/custom/Topper";

const orderStates = [
  { id: 1, name: "Order Placed", icon: Package, date: "2023-05-01" },
  { id: 2, name: "Processing", icon: Package, date: "2023-05-02" },
  { id: 3, name: "Shipped", icon: Truck, date: "2023-05-03" },
  { id: 4, name: "Out for Delivery", icon: Truck, date: "2023-05-04" },
  { id: 5, name: "Delivered", icon: CheckCircle, date: "2023-05-05" },
];

const existingOrders = [
  { id: "ORD-001", name: "Summer Collection Order" },
  { id: "ORD-002", name: "Electronics Bundle" },
  { id: "ORD-003", name: "Home Decor Set" },
];

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [currentState, setCurrentState] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = () => {
    if (orderId.trim() === "") {
      setError("Please enter a valid Order ID or select an existing order");
      return;
    }
    setError("");
    setIsTracking(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      // For demo purposes, we'll set a random current state
      setCurrentState(Math.floor(Math.random() * 5) + 1);
      setIsTracking(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Topper
        title="Order Tracking"
        description="Here you can track your orders and get updates on their status."
        icon={MapPin}
        image="/images/cargo2.jpg" // Adjust the image path as necessary
      />

      <Card className=" ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-700">
            Track Your Order
          </CardTitle>
          <CardDescription>
            Enter your order ID or select from your recent orders to track your
            package
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
                  {existingOrders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.name}
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
          {currentState > 0 && (
            <div className="space-y-4">
              {orderStates.map((state, index) => (
                <motion.div
                  key={state.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 ${
                    index < currentState ? "text-purple-700" : "text-gray-400"
                  }`}
                >
                  <div className="relative">
                    <state.icon className="h-8 w-8" />
                    {index < orderStates.length - 1 && (
                      <div
                        className={`absolute top-full left-1/2 w-0.5 h-full transform -translate-x-1/2 ${
                          index < currentState - 1
                            ? "bg-purple-700"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{state.name}</p>
                    <p className="text-sm">{state.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          For any issues, please contact our customer support at
          support@example.com
        </CardFooter>
      </Card>
    </div>
  );
}
