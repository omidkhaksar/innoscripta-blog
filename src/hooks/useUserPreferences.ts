import { useState, useEffect } from "react";

interface Preferences {
  categories: string[];
  sources: string[];
  authors: string[];
  searchQuery : string
}

export const useUserPreferences = (): [Preferences, (newPreferences: Partial<Preferences>) => void] => {
  const [preferences, setPreferences] = useState<Preferences>({
    searchQuery : '',
    categories: [],
    sources: [],
    authors: [],
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem("preferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
  };

  return [preferences, updatePreferences];
};
