"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useGlobal } from "@/context/GlobalContext";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["customer", "admin", "staff"]),
  phone: z.string().optional(),
  isActive: z.boolean(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function AddUserSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useAuth();
  const { fetchUsers } = useGlobal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "customer",
      isActive: true,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      t("success", "User added successfully", "default");
      reset();
      onClose();
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      t("error", "Failed to add user", "destructive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="m-4 max-h-[95vh] rounded-md flex flex-col overflow-y-auto border-2 border-gray-300 dark:border-gray-800">
        <SheetHeader>
          <SheetTitle>Add New User</SheetTitle>
          <SheetDescription>
            Fill in the details below to add a new user to the system.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="isActive">Is Active?</Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={field.value ? "true" : "false"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.isActive && (
              <p className="text-sm text-red-500">{errors.isActive.message}</p>
            )}
          </div>
        </form>

        <SheetFooter className="mt-6">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
