// UITabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UITabsProps {
  defaultValue: string;
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];
}

const UITabs = ({ defaultValue, tabs }: UITabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="mb-6">
      <TabsList className="bg-gray-100 dark:bg-gray-800">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UITabs;
