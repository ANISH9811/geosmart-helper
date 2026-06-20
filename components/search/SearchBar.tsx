"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="absolute top-5 left-1/2 z-[1000] w-[420px] -translate-x-1/2">
      <input
        className="w-full rounded-xl border bg-white px-4 py-3 shadow-lg outline-none"
        placeholder="Search Apartment / Locality..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
}