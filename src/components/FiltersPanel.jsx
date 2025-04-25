const specialtiesList = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian/Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
];

function FiltersPanel({
  consultType,
  setConsultType,
  specialties,
  setSpecialties,
  sortBy,
  setSortBy,
  availableSpecialties = [], // ✅ new optional prop
}) {
  const toggleSpecialty = (specialty) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  // ✅ Filter specialties to show only ones with matching doctors
  const filteredSpecialtiesList = specialtiesList.filter((spec) =>
    availableSpecialties.some((available) =>
      available.toLowerCase().includes(spec.toLowerCase())
    )
  );

  return (
    <div className="w-full md:w-1/4 p-4 border rounded shadow-sm bg-white">
      <h3 className="font-semibold mb-2" data-testid="filter-header-moc">
        Consultation Mode
      </h3>
      <label className="block mb-1">
        <input
          type="radio"
          name="consult"
          value="Video Consult"
          data-testid="filter-video-consult"
          checked={consultType === "Video Consult"}
          onChange={() => setConsultType("Video Consult")}
        />{" "}
        Video Consult
      </label>
      <label className="block mb-3">
        <input
          type="radio"
          name="consult"
          value="In Clinic"
          data-testid="filter-in-clinic"
          checked={consultType === "In Clinic"}
          onChange={() => setConsultType("In Clinic")}
        />{" "}
        In Clinic
      </label>

      <h3
        className="font-semibold mb-2 mt-4"
        data-testid="filter-header-speciality"
      >
        Speciality
      </h3>
      <div className="max-h-56 overflow-y-auto pr-1 text-sm">
        {filteredSpecialtiesList.map((item, idx) => (
          <label key={idx} className="block">
            <input
              type="checkbox"
              checked={specialties.includes(item)}
              onChange={() => toggleSpecialty(item)}
              data-testid={`filter-specialty-${item
                .replaceAll("/", "-")
                .replaceAll(" ", "-")}`}
            />{" "}
            {item}
          </label>
        ))}
      </div>

      <h3 className="font-semibold mb-2 mt-4" data-testid="filter-header-sort">
        Sort
      </h3>
      <label className="block">
        <input
          type="radio"
          name="sort"
          value="fees"
          data-testid="sort-fees"
          checked={sortBy === "fees"}
          onChange={() => setSortBy("fees")}
        />{" "}
        Fees (Low to High)
      </label>
      <label className="block">
        <input
          type="radio"
          name="sort"
          value="experience"
          data-testid="sort-experience"
          checked={sortBy === "experience"}
          onChange={() => setSortBy("experience")}
        />{" "}
        Experience (High to Low)
      </label>
    </div>
  );
}

export default FiltersPanel;
