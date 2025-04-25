const specialtiesList = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Psychiatrist",
  "Dietitian/Nutritionist",
];

function FiltersPanel({
  consultType,
  setConsultType,
  specialties,
  setSpecialties,
  sortBy,
  setSortBy,
  availableSpecialties = [],
}) {
  const toggleSpecialty = (specialty) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  // ✅ Only show specialties that exist in doctor data
  const filteredSpecialtiesList = specialtiesList.filter((spec) =>
    availableSpecialties.some((s) =>
      s.toLowerCase().includes(spec.toLowerCase())
    )
  );

  return (
    <div className="space-y-4 w-full min-w-[250px]">
      {/* Consultation Mode */}
      <div>
        <h3
          className="text-sm font-semibold text-gray-700 mb-2"
          data-testid="filter-header-moc"
        >
          Consultation Mode
        </h3>
        <label className="block text-sm mb-1">
          <input
            type="radio"
            name="consult"
            value="Video Consult"
            data-testid="filter-video-consult"
            checked={consultType === "Video Consult"}
            onChange={() => setConsultType("Video Consult")}
            className="mr-2"
          />
          Video Consult
        </label>
        <label className="block text-sm">
          <input
            type="radio"
            name="consult"
            value="In Clinic"
            data-testid="filter-in-clinic"
            checked={consultType === "In Clinic"}
            onChange={() => setConsultType("In Clinic")}
            className="mr-2"
          />
          In Clinic
        </label>
      </div>

      {/* Speciality */}
      <div>
        <h3
          className="text-sm font-semibold text-gray-700 mb-2"
          data-testid="filter-header-speciality"
        >
          Speciality
        </h3>
        <div className="max-h-[200px] overflow-y-auto pr-1 text-sm space-y-1">
          {filteredSpecialtiesList.map((item, idx) => (
            <label key={idx} className="block break-words leading-tight">
              <input
                type="checkbox"
                checked={specialties.includes(item)}
                onChange={() => toggleSpecialty(item)}
                className="mr-2"
                data-testid={`filter-specialty-${item
                  .replaceAll("/", "-")
                  .replaceAll(" ", "-")}`}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3
          className="text-sm font-semibold text-gray-700 mb-2"
          data-testid="filter-header-sort"
        >
          Sort
        </h3>
        <label className="block text-sm mb-1">
          <input
            type="radio"
            name="sort"
            value="fees"
            data-testid="sort-fees"
            checked={sortBy === "fees"}
            onChange={() => setSortBy("fees")}
            className="mr-2"
          />
          Fees (Low to High)
        </label>
        <label className="block text-sm">
          <input
            type="radio"
            name="sort"
            value="experience"
            data-testid="sort-experience"
            checked={sortBy === "experience"}
            onChange={() => setSortBy("experience")}
            className="mr-2"
          />
          Experience (High to Low)
        </label>
      </div>
    </div>
  );
}

export default FiltersPanel;
