"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Menu,
  LogOut,
  UserCircle,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";

export default function Header({
  toggleSidebar,

}: {
  toggleSidebar: () => void;
  activeItem: string;
}) {
  const { setTheme, theme } = useTheme();
  const { user,logout } = useAuth();
  const {activeTab, setActiveTab} = useGlobal();
  return (
    <header className="bg-gradient-to-br from-blue-50 via-indigo-50 border border-gray-200 dark:border-gray-700 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-slate-900  rounded-xl mx-6 mt-4 mb-2 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button

            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden mr-2"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-2xl font-semibold text-foreground dark:text-white">{activeTab}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button

            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white">{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border border-gray-200 dark:border-gray-700">
              <DropdownMenuLabel>
                <div>{user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {user?.email && user.email.length > 20
                    ? `${user.email.substring(0, 20)}...`
                    : user?.email}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="" className="w-full flex items-center" onClick={() => setActiveTab("Profile")}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
