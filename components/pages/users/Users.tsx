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
  Users,
  UserPlus,
  Filter,
  UserCheck,
  User,
  Briefcase,
  ShoppingBag,
} from "lucide-react";
import Topper from "@/components/custom/Topper";
import AddUserSheet from "./AddUserSheet";
import { useGlobal } from "@/context/GlobalContext";
import { IUser } from "@/models/User";

const userTypes = ["customer", "staff", "admin"] as const;
type UserType = (typeof userTypes)[number];

export default function UsersCompon() {
  const { users } = useGlobal();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<UserType | "All">("All");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (typeFilter === "All" || user.role === typeFilter)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, typeFilter, users]);

  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === "admin").length;
  const staffUsers = users.filter((user) => user.role === "staff").length;
  const customerUsers = users.filter(
    (user) => user.role === "customer"
  ).length;

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Users Management"
        description="Welcome to the Users Management dashboard. Here you can manage your users efficiently. Use the tools below to search for specific users, filter by role, and get an overview of your user base."
        icon={Users}
        image="/images/ladysmiling.jpg"
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Users Overview
        </h2>
        <Button
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
          onClick={() => setOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Admins</CardTitle>
            <UserCheck className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{adminUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Staff</CardTitle>
            <Briefcase className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{staffUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Customers</CardTitle>
            <ShoppingBag className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customerUsers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as UserType | "All")}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              {userTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <Table className="bg-white dark:bg-gray-900">
            <TableHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 dark:border-none">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Phone</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id as string}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "destructive"
                          : user.role === "staff"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user?.phone || "N/A"}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddUserSheet isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
