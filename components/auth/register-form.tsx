"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const { t } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
       try {
         const reponse = await axios.post("/api/auth/register", {
           username: values.name.trim(),
           email: values.email.trim() || values.name.trim(),
           password: values.password.trim(),
           phone: "",
         });
         const loggenInuser = reponse.data.existingUser;
         console.log(loggenInuser,"loggenInuser");

         const user = {
           username: loggenInuser.username,
           email: loggenInuser.email || loggenInuser.username,
           phone: loggenInuser.phone,
           role: loggenInuser.role,
           _id: loggenInuser._id,
         };
         localStorage.setItem(
           "authUserNeno",
           JSON.stringify({
             user: user,
             userId: loggenInuser._id,
             role: loggenInuser.role,
             timestamp: Date.now(),
           })
         );
         router.push("/dashboard");
       } catch (err: any) {
         console.log(err,"err");
         t("error", err.response.data.message, "destructive");
         t("error", `${values.email} is not added by admin`, "destructive");
       } finally {
         setIsLoading(false);
       }
    console.log(values);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} className="text-foreground bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} className="text-foreground bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-foreground dark:text-white" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}