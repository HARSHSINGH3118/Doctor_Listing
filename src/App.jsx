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
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [consultType, setConsultType] = useState(
    searchParams.get("consult") || ""
  );
  const [specialties, setSpecialties] = useState(
    searchParams.getAll("specialty") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((doc) => ({
          ...doc,
          specialties: doc.specialities?.map((s) => s.name) || [],
          fee: parseInt(doc.fees.replace(/[^\d]/g, "")),
          experience: parseInt(doc.experience.replace(/[^\d]/g, "")),
          mode: getMode(doc),
        }));

        const allSpecs = new Set();
        formatted.forEach((doc) => {
          doc.specialties.forEach((spec) => allSpecs.add(spec));
        });

        setDoctors(formatted);
        setAvailableSpecialties([...allSpecs].sort());
      });
  }, []);

  const getMode = (doc) => {
    if (doc.video_consult && doc.in_clinic) return "both";
    if (doc.video_consult) return "Video Consult";
    if (doc.in_clinic) return "In Clinic";
    return "";
  };

  useEffect(() => {
    const result = applyFiltersAndSort(
      doctors,
      searchTerm,
      consultType,
      specialties,
      sortBy
    );
    setFilteredDoctors(result);

    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (consultType) params.consult = consultType;
    if (specialties.length > 0) params.specialty = specialties;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
  }, [doctors, searchTerm, consultType, specialties, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="sticky top-0 z-50 bg-white shadow-sm py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-center text-blue-700 tracking-tight">
            Doctor Listing Portal
          </h1>
          <p className="text-sm text-center text-gray-500 mt-1">
            Search and filter doctors by specialization, consultation, and more
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4">
        {/* 🔍 Search bar centered */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="🔍 Search doctor by name..."
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              data-testid="autocomplete-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 🧩 Filters + Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Filters */}
          <div className="w-full md:w-1/4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-fit">
            <FiltersPanel
              consultType={consultType}
              setConsultType={setConsultType}
              specialties={specialties}
              setSpecialties={setSpecialties}
              sortBy={sortBy}
              setSortBy={setSortBy}
              availableSpecialties={availableSpecialties}
            />
          </div>

          {/* Right: Doctor Cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, idx) => (
                <DoctorCard key={idx} doctor={doctor} />
              ))}
            </div>

            {/* Empty State */}
            {filteredDoctors.length === 0 && (
              <p className="text-center text-gray-500 mt-8 text-sm">
                No doctors found for selected filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
