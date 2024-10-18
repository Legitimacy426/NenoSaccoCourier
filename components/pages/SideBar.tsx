"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  UserCircle,
  ChevronRight,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, color: "text-blue-500" },
  { name: "Parcels", icon: Package, color: "text-green-500" },
  { name: "Orders", icon: ShoppingCart, color: "text-yellow-500" },
  { name: "Track", icon: MapPin, color: "text-gray-500" },
  { name: "Users", icon: Users, color: "text-purple-500" },
  // { name: "Profile", icon: UserCircle, color: "text-pink-500" },
];

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const { activeTab, setActiveTab } = useGlobal();
  const [isExpanded, setIsExpanded] = useState(true);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isLargeScreen) {
      toggleSidebar();
    }
  }, [isLargeScreen, toggleSidebar]);

  return (
    <aside
      className={cn(
        "fixed inset-y-4 left-4 z-50 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-slate-900 shadow-lg transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 h-[calc(100vh-2rem)] rounded-xl border border-gray-200 dark:border-gray-700",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isLargeScreen ? (isExpanded ? "w-64" : "w-20") : "w-64"
      )}
    >
      <div className="flex flex-col h-full rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {(isExpanded || !isLargeScreen) && (
            <div className="flex items-center space-x-2">
              <Image
                src="/images/nenologo.jpg"
                alt="Neno Sacco Courier Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <h2 className="text-xl font-semibold">Neno Sacco</h2>
            </div>
          )}
          {!isLargeScreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
          {isLargeScreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden lg:flex"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded ? "rotate-180" : ""
                )}
              />
            </Button>
          )}
        </div>
        <ScrollArea className="flex-grow">
          <nav className="p-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                variant={activeTab === item.name ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start mb-1 transition-colors rounded-lg",
                  activeTab === item.name
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-muted",
                  isExpanded || !isLargeScreen ? "px-4" : "px-2"
                )}
                onClick={() => {
                  setActiveTab(item.name);
                  if (!isLargeScreen) {
                    toggleSidebar();
                  } else if (!isExpanded) {
                    setIsExpanded(true);
                  }
                }}
              >
                <item.icon className={cn("h-5 w-5", item.color)} />
                {(isExpanded || !isLargeScreen) && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        {(isExpanded || !isLargeScreen) && (
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-lg mx-2 mb-2">
            <div className="relative w-full h-24 rounded-t-lg overflow-hidden">
              <Image
                src="/images/cargo1.jpg"
                alt="Track your order"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Track Your Order</h3>
              <p className="text-sm opacity-90 mb-4">
                Get real-time updates on your package's journey.
              </p>
              <Button
                onClick={() => {
                  setActiveTab("Track");
                  if (!isLargeScreen) {
                    toggleSidebar();
                  } else if (!isExpanded) {
                    setIsExpanded(true);
                  }
                }}
                variant="secondary"
                className="w-full bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center"
              >
                <Search className="mr-2 h-4 w-4" />
                Track Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
