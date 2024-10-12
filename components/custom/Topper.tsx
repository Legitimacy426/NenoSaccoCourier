// Topper.tsx
"use client";

import Image from "next/image";
import { LucideIcon } from "lucide-react"; // Type for the icon prop

interface TopperProps {
  title: string;
  description: string;
  icon: LucideIcon; // Icon component type
  image: string; // Image URL
}

const Topper = ({ title, description, icon: Icon, image }: TopperProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 mr-4">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="relative w-full md:w-1/5 h-64 md:h-auto">
          <Image
            src={image}
            alt="Order Management Illustration"
            layout="fill"
            objectFit="cover"
            className="rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Topper;
