// src/App.jsx
import { useEffect, useState } from "react";
import Autocomplete from "./components/Autocomplete";
import FiltersPanel from "./components/FiltersPanel";
import DoctorCard from "./components/DoctorCard";
import { applyFiltersAndSort } from "./utils/helpers";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // State for filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [consultType, setConsultType] = useState(
    searchParams.get("consult") || ""
  );
  const [specialties, setSpecialties] = useState(
    searchParams.getAll("specialty") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");

  // Fetch doctor data once
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  // Apply filters and sort whenever any dependency changes
  useEffect(() => {
    const result = applyFiltersAndSort(
      doctors,
      searchTerm,
      consultType,
      specialties,
      sortBy
    );
    setFilteredDoctors(result);

    // Update query params in URL
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (consultType) params.consult = consultType;
    if (specialties.length > 0) params.specialty = specialties;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
  }, [doctors, searchTerm, consultType, specialties, sortBy]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Listing</h1>
      <Autocomplete
        doctors={doctors}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <FiltersPanel
          consultType={consultType}
          setConsultType={setConsultType}
          specialties={specialties}
          setSpecialties={setSpecialties}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor, idx) => (
            <DoctorCard key={idx} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
