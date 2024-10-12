"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import Header from "./Header";

// Dynamically import the components
const Dashboard = dynamic(() => import("./dashboard/Dashboard"));
const Parcels = dynamic(() => import("./percels/Percels"));
const UsersComponent = dynamic(() => import("./users/Users"));
const Orders = dynamic(() => import("./orders/Orders"));
const Profile = dynamic(() => import("./profile/Profile"));

const Track = dynamic(() => import("./track/Track"));

export default function Main() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <SideBar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} activeItem={activeItem} />

        {/* Main content area with gradient background */}
        <main className="flex-1 overflow-y-auto p-6 m-0">
          <div className="container mx-auto">
            {activeItem === "Dashboard" && <Dashboard />}
            {activeItem === "Parcels" && <Parcels />}
            {activeItem === "Users" && <UsersComponent />}
            {activeItem === "Orders" && <Orders />}
            {activeItem === "Profile" && <Profile />}

            {activeItem === "Track" && <Track />}
          </div>
        </main>
      </div>
    </div>
  );
}
