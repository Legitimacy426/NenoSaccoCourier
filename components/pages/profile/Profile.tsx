"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Camera,
  Settings,
  AlertCircle,
} from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState(
    "I'm a software developer with a passion for creating intuitive user experiences."
  );
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const recentNotifications = [
    {
      id: 1,
      message: "Your password was changed successfully",
      date: "2 hours ago",
    },
    {
      id: 2,
      message: "New login detected from Chrome on Windows",
      date: "1 day ago",
    },
    {
      id: 3,
      message: "Your monthly usage report is available",
      date: "3 days ago",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-3 mr-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Manage your account settings and preferences

        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile picture"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Admin
                </CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                   
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="security">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <p className="text-sm text-gray-500">
                        Update your password to keep your account secure
                      </p>
                    </div>
                    <Button variant="outline">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-medium">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={twoFactor}
                      onCheckedChange={setTwoFactor}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-medium">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive email updates about your account activity
                      </p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Notification Preferences
                    </h3>
                    <p className="text-sm text-gray-500">
                      Choose which types of notifications you'd like to receive
                    </p>
                    <div className="grid gap-2">
                      <Label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Account updates</span>
                      </Label>
                      <Label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>New features and announcements</span>
                      </Label>
                      <Label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Marketing and promotional emails</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Recent Notifications
            </CardTitle>
            <CardDescription>
              Stay updated with your account activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className="flex items-start space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
