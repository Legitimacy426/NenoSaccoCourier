"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import { IParcel } from "@/models/Parcel";
import { IUser } from "@/models/User";
import { IDestination } from "@/models/Destination";
import axios from "axios";

enum OrderStatus {
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

interface AddOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddOrderSheet({ isOpen, onClose }: AddOrderSheetProps) {
  const { t } = useAuth();
  const { users, destinations, parcels, fetchDestinations } = useGlobal();
  const [selectedParcels, setSelectedParcels] = useState<{
    [key: string]: number;
  }>({});
  const [carrier, setCarrier] = useState<string>("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] =
    useState<Date | null>(null);
  const [customer, setCustomer] = useState<string>("");
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Processing);
  const [shippingPrice, setShippingPrice] = useState<string>("0");
  const [userParcels, setUserParcels] = useState<IParcel[]>([]);
  const [fromDestination, setFromDestination] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDestination, setToDestination] = useState<string>("");
  const [newFromDestination, setNewFromDestination] = useState<{
    name: string;
    address: string;
  }>({ name: "", address: "" });
  const [newToDestination, setNewToDestination] = useState<{
    name: string;
    address: string;
  }>({ name: "", address: "" });
  const [isCreatingFromDestination, setIsCreatingFromDestination] =
    useState(false);
  const [isCreatingToDestination, setIsCreatingToDestination] = useState(false);

  useEffect(() => {
    if (customer) {
      const selectedUser = users.find((user) => user._id === customer);
      setUserParcels((selectedUser?.parcels as IParcel[]) || []);
      setSelectedParcels({});
    } else {
      setUserParcels([]);
    }
  }, [customer, users, parcels]);

  const handleParcelSelect = (parcelId: string, checked: boolean) => {
    setSelectedParcels((prev) => {
      if (checked) {
        return { ...prev, [parcelId]: 1 };
      } else {
        const { [parcelId]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const clearForm = () => {
    setCustomer("");
    setSelectedParcels({});
    setCarrier("");
    setEstimatedDeliveryDate(null);
    setShippingPrice("0");
    setFromDestination("");
    setToDestination("");
  };

  const handleQuantityChange = (parcelId: string, quantity: number) => {
    setSelectedParcels((prev) => ({ ...prev, [parcelId]: quantity }));
  };

  const calculateTotal = () => {
    return (
      Object.entries(selectedParcels).reduce((total, [parcelId, quantity]) => {
        const parcel = userParcels.find((p) => p._id === parcelId);
        return total + (parcel ? parcel.price * quantity : 0);
      }, 0) + parseFloat(shippingPrice)
    );
  };

  const createNewDestination = async (destinationData: { name: string; address: string }) => {
    try {
      const response = await axios.post("/api/destinations", destinationData);
      fetchDestinations();
      return response.data._id;
    } catch (error) {
      console.error("Failed to create new destination:", error);
      t("error", "Failed to create new destination", "destructive");
      return null;
    }
  };
  const generateTrackingNumber = () => {
    const prefix = "ORD";
    const timestamp = Date.now().toString(36);
    const randomSuffix = Math.random()
      .toString(36)
      .substring(2, 15)
      .toUpperCase();
    return `${prefix}-${timestamp}-${randomSuffix}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const totalAmount = calculateTotal();
    const selectedParcelIds = Object.keys(selectedParcels);

    let fromDestinationId = fromDestination;
    let toDestinationId = toDestination;

    if (isCreatingFromDestination) {
      fromDestinationId = await createNewDestination(newFromDestination);
      if (!fromDestinationId) return;
    }

    if (isCreatingToDestination) {
      toDestinationId = await createNewDestination(newToDestination);
      if (!toDestinationId) return;
    }

    const orderData = {
      trackingNumber: generateTrackingNumber(),
      carrier,
      estimatedDeliveryDate,
      orderId: "", // This will be generated on the server
      customer,
      parcels: selectedParcelIds,
      status,
      orderDate: new Date(),
      totalAmount,
      shippingPrice: parseFloat(shippingPrice),
      fromDestination: fromDestinationId.trim().toUpperCase(),
      toDestination: toDestinationId.trim().toUpperCase(),
    };

    console.log("Order Data:", orderData);
    try {
      const response = await axios.post("/api/orders", orderData);
      console.log("Order created successfully:", response.data);
      t("success", "Order created successfully", "default");
      setIsLoading(false);
      clearForm();
      onClose();
    } catch (error) {
      console.error("Failed to create order:", error);
      t("error", "Failed to create order", "destructive");
    }
    setIsLoading(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[30vw] m-4 max-h-[96vh] rounded-md flex flex-col overflow-y-auto border-2 border-gray-300 dark:border-gray-800 shadow-md">
        <SheetHeader>
          <SheetTitle>Add New Order</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select onValueChange={setCustomer} required>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user: IUser) => (
                  <SelectItem
                    key={user._id as string}
                    value={user._id as string}
                  >
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {customer && (
            <div className="space-y-2">
              <Label>Select Parcels</Label>
              {userParcels.map((parcel: IParcel) => (
                <div
                  key={parcel._id as string}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={parcel._id as string}
                    checked={(parcel._id as string) in selectedParcels}
                    onCheckedChange={(checked) =>
                      handleParcelSelect(
                        parcel._id as string,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={parcel._id as string}>
                    {parcel.name} - ${parcel.price}
                  </Label>
                  {(parcel._id as string) in selectedParcels && (
                    <Input
                      type="number"
                      min="1"
                      value={selectedParcels[parcel._id as string]}
                      onChange={(e) =>
                        handleQuantityChange(
                          parcel._id as string,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-20"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fromDestination">From Destination</Label>
            <Select
              onValueChange={(value) => {
                if (value === "new") {
                  setIsCreatingFromDestination(true);
                  setFromDestination("");
                } else {
                  setIsCreatingFromDestination(false);
                  setFromDestination(value);
                }
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select from destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest: IDestination) => (
                  <SelectItem key={dest._id as string} value={dest._id as string}>
                    {dest.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">Create new destination</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isCreatingFromDestination && (
            <div className="space-y-2">
              <Label htmlFor="newFromDestinationName">
                New From Destination Name
              </Label>
              <Input
                id="newFromDestinationName"
                value={newFromDestination.name}
                onChange={(e) =>
                  setNewFromDestination({
                    ...newFromDestination,
                    name: e.target.value,
                  })
                }
                required
              />
              <Label htmlFor="newFromDestinationAddress">
                New From Destination Address
              </Label>
              <Input
                id="newFromDestinationAddress"
                value={newFromDestination.address}
                onChange={(e) =>
                  setNewFromDestination({
                    ...newFromDestination,
                    address: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="toDestination">To Destination</Label>
            <Select
              onValueChange={(value) => {
                if (value === "new") {
                  setIsCreatingToDestination(true);
                  setToDestination("");
                } else {
                  setIsCreatingToDestination(false);
                  setToDestination(value);
                }
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select to destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest: IDestination) => (
                  <SelectItem key={dest._id as string} value={dest._id as string}>
                    {dest.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">Create new destination</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isCreatingToDestination && (
            <div className="space-y-2">
              <Label htmlFor="newToDestinationName">
                New To Destination Name
              </Label>
              <Input
                id="newToDestinationName"
                value={newToDestination.name}
                onChange={(e) =>
                  setNewToDestination({
                    ...newToDestination,
                    name: e.target.value,
                  })
                }
                required
              />
              <Label htmlFor="newToDestinationAddress">
                New To Destination Address
              </Label>
              <Input
                id="newToDestinationAddress"
                value={newToDestination.address}
                onChange={(e) =>
                  setNewToDestination({
                    ...newToDestination,
                    address: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="carrier">Carrier</Label>
            <Input
              id="carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedDeliveryDate">
              Estimated Delivery Date
            </Label>
            <Input
              type="date"
              value={estimatedDeliveryDate?.toISOString().split("T")[0]}
              onChange={(e) =>
                setEstimatedDeliveryDate(new Date(e.target.value))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingPrice">Shipping Price</Label>
            <Input
              id="shippingPrice"
              type="number"
              min="0"
              step="0.01"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Order Status</Label>
            <Select
              onValueChange={(value) => setStatus(value as OrderStatus)}
              defaultValue={status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select order status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(OrderStatus).map((statusValue) => (
                  <SelectItem key={statusValue} value={statusValue}>
                    {statusValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <p className="text-lg font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>

          <div className="pt-6">
            <Button type="submit" disabled={isLoading} className="w-full text-white">
              {isLoading ? "Loading..." : "Create Order"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
