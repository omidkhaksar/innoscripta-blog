import React from "react";
import Checkbox from "@/components/Checkbox/Checkbox";

interface SourceListProps {
  sources: string[];
  selectedSources: string[]; // Selected sources should always be an array
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const SourceList: React.FC<SourceListProps> = ({ sources, selectedSources = [], onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="font-bold text-base">Source</label>
    <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-3 border p-2 rounded-md">
      {sources.map((source) => (
        <Checkbox
          key={source}
          label={source}
          name={source}
          checked={selectedSources.includes(source)} // Safely check if source is included
          onChange={(e:any) => onChange(e, source)} // Handle the onChange event
        />
      ))}
    </div>
  </div>
);

export default SourceList;
