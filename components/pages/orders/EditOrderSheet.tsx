"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OrderStatus, IOrder } from "@/models/Order";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import axios from "axios"; // Import axios
interface EditOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
}

export default function EditOrderSheet({
  isOpen,
  onClose,
  order,
}: EditOrderSheetProps) {
  const [status, setStatus] = useState(""); // Track only status
 const {t} = useAuth()
 const {fetchOrders} = useGlobal()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Update local state when the selected order changes
  useEffect(() => {
    if (order) {
      setStatus(order.status || ""); // Set status if available
    }
  }, [order]);



 // Handle API call to update the order status
 const handleSave = async () => {
   if (order) {
     setIsLoading(true); // Set loading state to true

     try {
       // Send the PUT request using axios
       const response = await axios.put("/api/orders", {
         _id: order._id,
         status, // Send only the status update
       });

       if (response.status !== 200) {
         throw new Error("Failed to update the order status");
       }

       // Refresh orders after successful update
       fetchOrders();
       t("success", "Status updated", "default"); // Show success message
     } catch (error) {
       console.error("Error updating order status:", error);
       t("error", "Something went wrong", "destructive"); // Show error message
     } finally {
       setIsLoading(false); // Set loading state back to false
       onClose(); // Close the modal after saving
     }
   }
 };


  if (!order) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[30vw] m-4 max-h-[96vh] rounded-md flex flex-col overflow-y-auto border-2 border-gray-300 dark:border-gray-800 shadow-md">
        <SheetHeader>
          <SheetTitle>Edit Order Status</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="status" className="text-sm font-medium">
              Order Status
            </label>
            <Select
              value={status}
              onValueChange={setStatus} // Update status directly
            >
              <SelectTrigger id="status" className="w-full mt-1">
                <SelectValue placeholder="Select Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"pending"}>Pending</SelectItem>
                <SelectItem value={"shipped"}>Shipped</SelectItem>
                <SelectItem value={"delivered"}>Delivered</SelectItem>
                <SelectItem value={"cancelled"}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="mt-auto pt-4">
          <div className="flex justify-end gap-4 w-full">
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
            <Button
            disabled={isLoading}
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Loading..." : "Save Changes"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
