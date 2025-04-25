import { useEffect, useState } from "react";

function Autocomplete({ doctors, searchTerm, setSearchTerm }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = doctors
      .filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3);

    setSuggestions(matches);
  }, [searchTerm, doctors]);

  const handleSelect = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search doctor by name..."
        className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        data-testid="autocomplete-input"
      />

      {/* Suggestion Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg border border-gray-200 z-50">
          {suggestions.map((doc, index) => (
            <li
              key={index}
              onClick={() => handleSelect(doc.name)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
              data-testid="suggestion-item"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
