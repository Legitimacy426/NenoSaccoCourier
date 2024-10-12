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
import UITabs from "@/components/custom/UITabs"; // Import UITabs
import UITable from "@/components/custom/UITable"; // Import UITable
import { Users, UserPlus, Filter, UserCheck, User } from "lucide-react";
import Topper from "@/components/custom/Topper";

const userTypes = ["Customers", "Staff", "Admins"];

const users = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john@example.com",
    type: "Customers",
    status: "Active",
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane@example.com",
    type: "Staff",
    status: "Active",
  },
  {
    id: "USR003",
    name: "Bob Johnson",
    email: "bob@example.com",
    type: "Admins",
    status: "Inactive",
  },
  {
    id: "USR004",
    name: "Alice Brown",
    email: "alice@example.com",
    type: "Customers",
    status: "Active",
  },
  {
    id: "USR005",
    name: "Charlie Davis",
    email: "charlie@example.com",
    type: "Staff",
    status: "Active",
  },
];

export default function UsersCompon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Customers");

  const filteredUsers = users.filter(
    (user) =>
      user.type === activeTab &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || user.status === statusFilter)
  );

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const columns = [
    { header: "User ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Status", accessor: "status", badge: true },
    { header: "Actions", accessor: "actions" },
  ];

  const tabs = userTypes.map((type) => ({
    value: type,
    label: type,
    content: (
      <div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={`Search ${type.toLowerCase()}...`}
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
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-50"
          >
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>

        <UITable
          columns={columns}
          data={filteredUsers
            .filter((user) => user.type === type)
            .map((user) => ({
              ...user,
              actions: (
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              ),
            }))}
        />
      </div>
    ),
  }));

  return (
    <div className="p-8 space-y-8">
      <Topper
        title="Users Management"
        description="Welcome to the Users Management dashboard. Here you can manage your users efficiently. Use the tools below to search for specific users, filter by status, and get an overview of your business performance."
        icon={Users}
        image="/images/ladysmiling.jpg" // Adjust the image path as necessary
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Users Overview
        </h2>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active Users</CardTitle>
            <UserCheck className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Inactive Users
            </CardTitle>
            <User className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inactiveUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Removed the outer card */}
      <UITabs tabs={tabs} defaultValue={activeTab} />
    </div>
  );
}
