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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import axios from "axios";

interface AddParcelSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddParcelSheet: FC<AddParcelSheetProps> = ({ isOpen, onClose }) => {
  const { users, parcelTypes, fetchUsers, fetchParcels, fetchParcelTypes } = useGlobal();

  const { t } = useAuth();
  const [selectedSender, setSelectedSender] = useState<string>("");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("");
  const [selectedParcelType, setSelectedParcelType] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
  const [isCreatingRecipient, setIsCreatingRecipient] = useState<boolean>(false);
  const [isCreatingParcelType, setIsCreatingParcelType] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newRecipientName, setNewRecipientName] = useState<string>("");
  const [newRecipientEmail, setNewRecipientEmail] = useState<string>("");
  const [newParcelTypeName, setNewParcelTypeName] = useState<string>("");
  const [newParcelTypeDescription, setNewParcelTypeDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    try {
      let senderId = selectedSender;
      let recipientId = selectedRecipient;
      let parcelTypeId = selectedParcelType;

      if (isCreatingUser) {
        const newUserPayload = { username: newUserName, email: newUserEmail };
        const userResponse = await axios.post("/api/users", newUserPayload);
        if (userResponse.status === 201) {
          senderId = userResponse.data._id;
        }
      }

      if (isCreatingRecipient) {
        const newRecipientPayload = { username: newRecipientName, email: newRecipientEmail };
        const recipientResponse = await axios.post("/api/users", newRecipientPayload);
        if (recipientResponse.status === 201) {
          recipientId = recipientResponse.data._id;
        }
      }

      if (isCreatingParcelType) {
        const newParcelTypePayload = { name: newParcelTypeName, description: newParcelTypeDescription };
        const parcelTypeResponse = await axios.post("/api/parcelTypes", newParcelTypePayload);
        if (parcelTypeResponse.status === 201) {
          parcelTypeId = parcelTypeResponse.data._id;
        }
      }

      const payload = {
        senderId,
        recipientId,
        weight: Number(weight),
        price: Number(price),
        parcelType: parcelTypeId,
        name,
        description,
      };

      const response = await axios.post("/api/parcels", payload);
      if (response.status === 201) {

        t("success", "Parcel added successfully", "default");

        onClose();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      const err = error.response?.data?.error || "Failed to add parcel";

      t("error", "Error adding parcel", "destructive");
    } finally {
      setLoading(false);

      fetchParcels();

    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="m-4 max-h-[90vh] rounded-md flex flex-col overflow-y-auto border-2 border-gray-300 dark:border-gray-800 shadow-md">
        <SheetHeader>
          <SheetTitle>Add New Parcel</SheetTitle>
          <p className="text-sm text-gray-500">
            Fill in the details to add a new parcel
          </p>
        </SheetHeader>

        <form className="flex flex-col" onSubmit={handleSubmit}>


          {/* Parcel Name */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="parcelName">Parcel Name</Label>
            <Input
              id="parcelName"
              placeholder="Enter parcel name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Parcel Description */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="parcelDescription">Description (optional)</Label>
            <Textarea
              id="parcelDescription"
              placeholder="Enter parcel description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Sender Selection */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="sender">Sender</Label>
            <Select
              onValueChange={(value) => {
                if (value === "new") {
                  setIsCreatingUser(true);
                  setSelectedSender("");
                } else {
                  setSelectedSender(value);
                  setIsCreatingUser(false);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Existing Users</SelectLabel>
                  {users.map((user) => (
                    <SelectItem
                      key={user._id as string}
                      value={user._id as string}
                    >
                      {user.username} - {user.email}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Create New User</SelectLabel>
                  <SelectItem value="new">Create a new user</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {isCreatingUser && (
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="newUserName">New User Name</Label>
                <Input
                  id="newUserName"
                  placeholder="Enter new user name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserEmail">New User Email</Label>
                <Input
                  id="newUserEmail"
                  type="email"
                  placeholder="Enter new user email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                onClick={() => setIsCreatingUser(false)}
                type="button"
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Recipient Selection */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="recipient">Recipient</Label>
            <Select
              onValueChange={(value) => {
                if (value === "new") {
                  setIsCreatingRecipient(true);
                  setSelectedRecipient("");
                } else {
                  setSelectedRecipient(value);
                  setIsCreatingRecipient(false);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Existing Users</SelectLabel>
                  {users.map((user) => (
                    <SelectItem
                      key={user._id as string}
                      value={user._id as string}
                    >
                      {user.username} - {user.email}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Create New Recipient</SelectLabel>
                  <SelectItem value="new">Create a new recipient</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {isCreatingRecipient && (
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="newRecipientName">New Recipient Name</Label>
                <Input
                  id="newRecipientName"
                  placeholder="Enter new recipient name"
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newRecipientEmail">New Recipient Email</Label>
                <Input
                  id="newRecipientEmail"
                  type="email"
                  placeholder="Enter new recipient email"
                  value={newRecipientEmail}
                  onChange={(e) => setNewRecipientEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                onClick={() => setIsCreatingRecipient(false)}
                type="button"
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Parcel Type Selection */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="parcelType">Parcel Type</Label>
            <Select
              onValueChange={(value) => {
                if (value === "new") {
                  setIsCreatingParcelType(true);
                  setSelectedParcelType("");
                } else {
                  setSelectedParcelType(value);
                  setIsCreatingParcelType(false);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select parcel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Existing Parcel Types</SelectLabel>
                  {parcelTypes.map((type) => (
                    <SelectItem
                      key={type._id as string}
                      value={type._id as string}
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Create New Parcel Type</SelectLabel>
                  <SelectItem value="new">
                    Create a new parcel type
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {isCreatingParcelType && (
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="newParcelTypeName">
                  New Parcel Type Name
                </Label>
                <Input
                  id="newParcelTypeName"
                  placeholder="Enter new parcel type name"
                  value={newParcelTypeName}
                  onChange={(e) => setNewParcelTypeName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newParcelTypeDescription">Description</Label>
                <Textarea
                  id="newParcelTypeDescription"
                  placeholder="Enter parcel type description"
                  value={newParcelTypeDescription}
                  onChange={(e) =>
                    setNewParcelTypeDescription(e.target.value)
                  }
                  className="min-h-[100px] flex-grow"
                />
              </div>
              <Button
                onClick={() => setIsCreatingParcelType(false)}
                type="button"
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Weight Input */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          {/* Price Input */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mt-auto">
            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Parcel"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddParcelSheet;
