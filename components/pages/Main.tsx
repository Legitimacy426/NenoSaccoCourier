"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useGlobal } from "@/context/GlobalContext"; // Importing the GlobalContext
import SideBar from "./SideBar";
import Header from "./Header";

// Dynamically import the components
const Dashboard = dynamic(() => import("./dashboard/Dashboard"));
const Parcels = dynamic(() => import("./percels/Percels"));
const UsersComponent = dynamic(() => import("./users/Users"));
const Orders = dynamic(() => import("./orders/Orders"));
const Profile = dynamic(() => import("./profile/Profile"));
const Track = dynamic(() => import("./track/Track"));
const ParcelTypes = dynamic(() => import("./PercelTypes/PercelTypes"));

export default function Main() {
  const { activeTab, setActiveTab } = useGlobal(); // Use the activeTab from context
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <SideBar


        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} activeItem={activeTab} />

        {/* Main content area with gradient background */}
        <main className="flex-1 overflow-y-auto p-6 m-0">
          <div className="container mx-auto">
            {activeTab === "Dashboard" && <Dashboard />}
            {activeTab === "Parcels" && <Parcels />}
            {activeTab === "Users" && <UsersComponent />}
            {activeTab === "Orders" && <Orders />}
            {activeTab === "Profile" && <Profile />}
            {activeTab === "Track" && <Track />}
          
          </div>
        </main>
      </div>
    </div>
  );
}
