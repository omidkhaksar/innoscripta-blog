import React from "react";
import FilterInput from "@/components/FilterInput/FilterInput";
import SourceList from "@/components/SourceList/SourceList";
import Select from "@/components/Select/Select";
import { Filters } from "@/types/types";
import { useUserPreferences } from "@/hooks/useUserPreferences"; // Import the custom hook

const CategoryList = [
  { value: "", label: "Select an option" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "General", label: "General" },
  { value: "Health", label: "Health" },
  { value: "Science", label: "Science" },
  { value: "Sports", label: "Sports" },
  { value: "Entertainment", label: "Entertainment" },
];

interface FilterPanelProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  sources: string[];
  selectedSources: string[];
  onSourceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  searchQuery: string; // Add searchQuery as a prop
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Add setSearchQuery as a prop
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  sources,
  selectedSources,
  onSourceChange,
  searchQuery,
  setSearchQuery,
}) => {
  const [preferences, updatePreferences] = useUserPreferences();

  console.log(filters , preferences)
  const handleSavePreferences = () => {
    updatePreferences({
      searchQuery :searchQuery,
      categories: filters.category ? [filters.category] : [],
      sources: selectedSources,
    });
  };

  return (
    <div className="w-full lg:w-2/12 flex flex-col gap-5">
      <div className="container mx-auto lg:p-4 sticky top-2">
        <h2 className="text-2xl font-bold mb-4 lg:px-4">Filter</h2>
        <div className="flex flex-col gap-3 lg:h-[80vh] bg-white rounded-3xl border border-neutral-200 border-opacity-70 p-4">
          <FilterInput
            label="Search"
            type="text"
            name="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            label="Category"
            value={filters.category}
            options={CategoryList}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e }))}
          />
          <FilterInput
            label="From Date"
            type="date"
            name="fromDate"
            value={filters.from}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, from: e.target.value }))
            }
          />
          <FilterInput
            label="To Date"
            type="date"
            name="toDate"
            value={filters.to}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, to: e.target.value }))
            }
          />
          <SourceList
            sources={sources}
            selectedSources={selectedSources}
            onChange={onSourceChange}
          />
          {/* Add a button to save preferences */}
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSavePreferences}
            >
              Save as Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
