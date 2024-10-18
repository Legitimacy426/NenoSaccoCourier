"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import { IOrder } from "@/models/Order";

const data = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 30000 },
  { name: "Mar", value: 20000 },
  { name: "Apr", value: 18000 },
  { name: "May", value: 29000 },
  { name: "Jun", value: 32000 },
  { name: "Jul", value: 50000},
  { name: "Aug", value: 38000 },
  { name: "sep", value: 59000 },
  { name: "Oct", value: 22000 },
  { name: "Nov", value: 59000 },
  { name: "Dec", value: 72000 },
];


export default function Dashboard() {

  const {parcels,users,orders} = useGlobal()
    const { user } = useAuth();
    function getTotalRevenue(orders: IOrder[]): number {

      const deliveredOrders = orders.filter(
        (order) => order.status === "delivered"
      );

      const totalRevenue = deliveredOrders.reduce((sum, order) => {
        return sum + order.totalAmount;
      }, 0);

      return totalRevenue;
    }
const totalRevenue = getTotalRevenue(orders);




const recentOrders = orders
  .sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
  .slice(0, 5);


  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your courier service today.
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Parcels</CardTitle>
            <Package className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{parcels?.length}</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-teal-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active Users</CardTitle>
            <Users className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users?.length}</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingCart className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orders?.length}</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Revenue</CardTitle>
            <BarChart className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">KES {totalRevenue}000000</div>
            <p className="text-sm opacity-80 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              15.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div
                  key={order._id as string}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {order.customer?.username
                          ? order.customer.username.charAt(0).toUpperCase()
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {order?.customer?.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        KES {order.totalAmount}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      order?.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order?.status === "shipped"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
