import { Plus, Ruler, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export type ModelSearchMode = "model" | "dimensions";

type ModelSearchTabsProps = {
  value: ModelSearchMode;
  onChange: (value: ModelSearchMode) => void;
  onCreate: () => void;
};

export default function ModelSearchTabs({ value, onChange, onCreate }: ModelSearchTabsProps) {
  return (
    <div className="model-search-tabs">
      <Tabs value={value} onValueChange={(nextValue) => onChange(nextValue as ModelSearchMode)}>
        <TabsList aria-label="Model search options">
          <TabsTrigger value="model">
            <Search size={16} />
            Search by model
          </TabsTrigger>
          <TabsTrigger value="dimensions">
            <Ruler size={16} />
            Search by dimensions
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button className="create-model-button" onClick={onCreate}>
        <Plus size={16} />
        Create model
      </Button>
    </div>
  );
}
