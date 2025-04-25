export function applyFiltersAndSort(
  doctors,
  searchTerm,
  consultType,
  specialties,
  sortBy
) {
  let result = [...doctors];

  if (searchTerm) {
    result = result.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (consultType) {
    result = result.filter((doc) => doc.mode === consultType);
  }

  if (specialties.length > 0) {
    result = result.filter((doc) =>
      specialties.every((sp) => doc.specialties.includes(sp))
    );
  }

  if (sortBy === "fees") {
    result.sort((a, b) => a.fee - b.fee);
  } else if (sortBy === "experience") {
    result.sort((a, b) => b.experience - a.experience);
  }

  return result;
}
