"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api/auth';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm() {
  const { user, refetchUser, t, setUser, loading,  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      // Attempt login
      const response = await authApi.login(values.email, values.password);
      const loggedInUser = response.data.user;

      // Save user data to local storage
      localStorage.setItem(
        "authUserNeno",
        JSON.stringify({
          user: loggedInUser,
          userId: loggedInUser._id,
          role: loggedInUser.role,
          timestamp: Date.now(),
        })
      );

      // Set the user state and refetch user data
      setUser(loggedInUser);
      refetchUser(loggedInUser.email);

      // Navigate based on user role
      if (loggedInUser.role === "staff" || loggedInUser.role === "customer") {
        router.push('/dashboard');
      } else if (loggedInUser.role === "admin") {
        router.push('/dashboard');
      }
    } catch (error) {
      // Catch any errors that occurred during the login process
      t("error", "Failed to login", "destructive");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
      refetchUser(user.email);
    }
  }, [user, router, refetchUser]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} className="text-foreground bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} className="text-foreground bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-foreground dark:text-white" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}