"use client";
import { createContext, Dispatch, SetStateAction } from 'react';

interface ConfiguratorContextProps {
  mini: boolean;
  setMini: Dispatch<SetStateAction<boolean>>;
  hovered: boolean;
  setHovered: Dispatch<SetStateAction<boolean>>;
  contrast: boolean;
  setContrast: Dispatch<SetStateAction<boolean>>;
}

export const ConfiguratorContext = createContext<ConfiguratorContextProps | undefined>(undefined);
