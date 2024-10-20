import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

import { toast } from "@/hooks/use-toast";
import { IUser } from "@/models/User";
import { IParcel } from "@/models/Parcel";
import { IOrder } from "@/models/Order";
import { IParcelType } from "@/models/ParcelType";
import { useAuth } from "./AuthContext";
import { IDestination } from "@/models/Destination";

// Type Definitions
type ToastVariant = "default" | "destructive" | null | undefined;

interface GlobalContextProps {

  loading: boolean;
  t: (title: string, message: string, variant: ToastVariant) => void;
  tabs: any[];
  setTabs: Dispatch<SetStateAction<any[]>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  selectedUser: IUser | null;
  setSelectedUser: Dispatch<SetStateAction<IUser | null>>;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  fetchUsers: () => void;
  parcels: IParcel[];
  setParcels: Dispatch<SetStateAction<IParcel[]>>;
  fetchParcels: () => void;
  orders: IOrder[];
  setOrders: Dispatch<SetStateAction<IOrder[]>>;
  fetchOrders: () => void;
  parcelTypes: IParcelType[];
  setParcelTypes: Dispatch<SetStateAction<IParcelType[]>>;
  fetchParcelTypes: () => void;
  destinations: IDestination[];
  setDestinations: Dispatch<SetStateAction<IDestination[]>>;
  fetchDestinations: () => void;

}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [tabs, setTabs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Track");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [parcels, setParcels] = useState<IParcel[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [parcelTypes, setParcelTypes] = useState<IParcelType[]>([]);
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  // Toast function
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

  // Fetch users function
    const fetchDestinations = useCallback(async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/destinations", {
          headers: { "Cache-Control": "no-cache" },
        });
        setDestinations(response.data);
      } catch (error) {
        console.error("Failed to fetch destinations", error);
        t("Error", "Failed to fetch destinations. Please try again.", "destructive");
      } finally {
        setLoading(false);
      }
    }, [t]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users", {
        headers: { "Cache-Control": "no-cache" },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      t("Error", "Failed to fetch users. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Fetch parcels function
  const fetchParcels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/parcels", {
        headers: { "Cache-Control": "no-cache" },
      });
      setParcels(response.data);
    } catch (error) {
      console.error("Failed to fetch parcels", error);
      t("Error", "Failed to fetch parcels. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Fetch parcel types function
  const fetchParcelTypes = useCallback(async () => {

    setLoading(true);
    try {
      const response = await axios.get("/api/parcelTypes", {
        headers: { "Cache-Control": "no-cache" },
      });

      setParcelTypes(response.data);
    } catch (error) {
      console.error("Failed to fetch parcel types", error);
      t("Error", "Failed to fetch parcel types. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  }, [t]);


  // Fetch orders function
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/orders", {

      });
      setOrders(response.data);
    
    } catch (error) {
      console.error("Failed to fetch orders", error);
      t("Error", "Failed to fetch orders. Please try again.", "destructive");
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    const initializeData = async () => {
      await fetchUsers();
      await fetchParcels();
      await fetchOrders();
      await fetchParcelTypes();
      await fetchDestinations();
    };

    initializeData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        t,
        tabs,
        setTabs,
        activeTab,
        setActiveTab,
        selectedUser,
        setSelectedUser,
        users,
        setUsers,
        fetchUsers,
        parcels,
        setParcels,
        fetchParcels,
        orders,
        setOrders,
        fetchOrders,
        parcelTypes,
        setParcelTypes,
        fetchParcelTypes,
        destinations,
        setDestinations,
        fetchDestinations,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContextProvider");
  }
  return context;
};
