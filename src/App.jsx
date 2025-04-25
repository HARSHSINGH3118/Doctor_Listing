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
        setDoctors(formatted);
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="sticky top-0 bg-white shadow-md z-50 py-4 mb-6">
          <h1 className="text-3xl font-extrabold text-center text-blue-800">
            Doctor Listing Portal
          </h1>
        </header>

        <Autocomplete
          doctors={doctors}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FiltersPanel
            consultType={consultType}
            setConsultType={setConsultType}
            specialties={specialties}
            setSpecialties={setSpecialties}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, idx) => (
              <DoctorCard key={idx} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
