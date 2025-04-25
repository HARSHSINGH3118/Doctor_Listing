// src/components/Autocomplete.jsx
import { useEffect, useRef, useState } from "react";

function Autocomplete({ doctors, searchTerm, setSearchTerm }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matches = doctors
      .filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3);
    setSuggestions(matches);
    setShowSuggestions(true);
  }, [searchTerm, doctors]);

  const handleSelect = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-xl">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search doctor by name..."
          ref={inputRef}
          className="w-full px-4 py-2 border rounded shadow-sm"
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded mt-1 w-full shadow-lg">
          {suggestions.map((doc, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              onClick={() => handleSelect(doc.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
