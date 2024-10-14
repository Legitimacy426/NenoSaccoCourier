"use client";
import React, { ReactNode, useState } from "react";

import { AuthContextProvider } from "./context/AuthContext";
import { GlobalContextProvider } from "./context/GlobalContext";


interface AppWrappersProps {
  children: ReactNode;
}

export default function AppWrappers({ children }: AppWrappersProps) {
  return (
    <>
      <AuthContextProvider>
      <GlobalContextProvider>

       {children}

        </GlobalContextProvider>
    </AuthContextProvider>


    </>

  );
}
