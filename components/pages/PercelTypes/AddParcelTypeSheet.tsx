"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";

interface AddParcelTypeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddParcelTypeSheet: FC<AddParcelTypeSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useAuth(); // Translation function, adjust as necessary
  const { fetchParcelTypes } = useGlobal(); // Get refreshParcelTypes function from global context
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    try {
      const payload = { name, description };

      // Axios call to create the new parcel type
      const response = await axios.post("/api/parcelType", payload);

      if (response.status === 201) {

        t("success", "Parcel type added successfully", "default");
        onClose(); // Close the sheet
        fetchParcelTypes(); // Refresh parcel types in the global context
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      const err = error.response?.data?.error || "Failed to add parcel type"; // Get error message from response
      t("error", err, "destructive");
      console.error("Error adding parcel type:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="m-4 max-h-[90vh] rounded-md flex flex-col overflow-y-auto border-2 border-gray-300 dark:border-gray-800">
        <SheetHeader>
          <SheetTitle>Add Parcel Type</SheetTitle>
          <p className="text-sm text-gray-500">
            Fill in the details to add a new parcel type
          </p>
        </SheetHeader>
        <form className="flex flex-col flex-grow mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2 mb-4">
            <Label htmlFor="name">Parcel Type Name</Label>
            <Input
              id="name"
              placeholder="Enter parcel type name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 mb-4 flex-grow">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter parcel type description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] flex-grow"
              required={false} // Make description optional
            />
          </div>
          <div className="mt-auto">
            {" "}
            {/* Push the button to the bottom */}
            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Parcel Type"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddParcelTypeSheet;
