import React from "react";
import FilterInput from "@/components/FilterInput/FilterInput";
import SourceList from "@/components/SourceList/SourceList";
import Select from "@/components/Select/Select";
import { FilterPanelProps } from "@/types/types";
import { useUserPreferences } from "@/hooks/useUserPreferences"; // Import the custom hook
import { CategoryList } from "./CategoryList";

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

  console.log(filters, preferences);
  const handleSavePreferences = () => {
    updatePreferences({
      searchQuery: searchQuery,
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
