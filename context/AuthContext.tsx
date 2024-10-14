"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

import { IUser } from "@/models/User";


type ToastVariant = "default" | "destructive" | null | undefined;

interface AuthContextProps {
  user: any;
  userId: string | null;
  role: string | null;
  loading: boolean;
  setRole: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<any>>;
  refetchUser: (email: string) => Promise<void>;
  t: (title: string, message: string, variant: ToastVariant) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const t = useCallback(
    (title: string, message: string, variant: ToastVariant) => {
      toast({
        variant,
        title,
        description: message,
      });
    },
    []
  );

  const refetchUser = useCallback(
    async (email: string) => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users?email=${email}`);

        if (response.data) {
          const userData = response.data as IUser;
          setUser(userData);
          setUserId(userData._id as string);
          setRole(userData.role);

          // Cache the user data
          localStorage.setItem(
            "authUserApartments",
            JSON.stringify({
              user: userData,
              userId: userData._id,
              role: userData.role,
              timestamp: Date.now(),
            })
          );
        } else {
          setUser(null);
          setUserId(null);
          setRole(null);
          router.push("/auth"); // Redirect to auth if user is not found
        }
      } catch (error) {
        console.error("Error refetching user data:", error);
        setUser(null);
        setUserId(null);
        setRole(null);
        router.push("/auth"); // Redirect to auth on error
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const loadUser = async () => {

      if (typeof window === "undefined") return;

      setLoading(true);

      const cachedUser = JSON.parse(localStorage.getItem("authUserNeno") || "null");

      if (
        cachedUser &&
        Date.now() - cachedUser.timestamp < 24 * 60 * 60 * 1000 // Cache valid for 24 hours
      ) {
        await refetchUser(cachedUser?.user?.email || cachedUser?.user?.username);
        setLoading(false);
        return;
      }

      setUser(null);
      setUserId(null);
      setRole(null);
      setLoading(false);
      router.push("/auth");
    };

    loadUser();
  }, []);


  const logout = () => {
    setUser(null);
    setUserId(null);
    setRole(null);

    localStorage.removeItem("authUserNeno");
    router.push("/auth");
    t("Logged out", "You have been logged out successfully", "default");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        role,
        loading,
        setRole,
        setUser,
        refetchUser,
        t,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
