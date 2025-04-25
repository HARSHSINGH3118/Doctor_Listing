import { useEffect, useState } from "react";
import Autocomplete from "./components/Autocomplete";
import FiltersPanel from "./components/FiltersPanel";
import DoctorCard from "./components/DoctorCard";
import { applyFiltersAndSort } from "./utils/helpers";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

function getMode(doc) {
  if (doc.video_consult && doc.in_clinic) return "both";
  if (doc.video_consult) return "Video Consult";
  if (doc.in_clinic) return "In Clinic";
  return "";
}

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [consultType, setConsultType] = useState(
    searchParams.get("consult") || ""
  );
  const [specialties, setSpecialties] = useState(
    searchParams.getAll("specialty") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();

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
    };

    fetchData();
  }, []);

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
          <h1 className="text-3xl font-extrabold text-left text-blue-700 tracking-tight">
            Doctor Listing Portal
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <Autocomplete
          doctors={doctors}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
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

        <div className="flex-1 max-h-[80vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, idx) => (
              <DoctorCard key={idx} doctor={doctor} />
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <p className="text-center text-gray-500 mt-8 text-sm">
              No doctors found for selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
