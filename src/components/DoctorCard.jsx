import { useState } from "react";
import { CurrencyRupeeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

function DoctorCard({ doctor }) {
  const [showMore, setShowMore] = useState(false);

  const shortIntro = doctor.doctor_introduction
    ? doctor.doctor_introduction.slice(0, 200) +
      (doctor.doctor_introduction.length > 200 ? "..." : "")
    : "";

  const clinicLine = doctor.clinic?.name
    ? `${doctor.clinic.name}${
        doctor.clinic.address?.city ? " — " + doctor.clinic.address.city : ""
      }`
    : "";

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between text-center border border-gray-100 min-h-[450px]"
      data-testid="doctor-card"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md mb-3"
        />

        <h2
          className="text-lg font-semibold text-gray-800"
          data-testid="doctor-name"
        >
          {doctor.name}
        </h2>
        <p
          className="text-sm text-gray-500 italic mb-2"
          data-testid="doctor-specialty"
        >
          {doctor.specialties?.join(", ")}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {doctor.video_consult && (
            <span
              className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold border border-yellow-200 transition-transform duration-200 hover:scale-105"
              title="Doctor offers video consultation"
            >
              Video
            </span>
          )}
          {doctor.in_clinic && (
            <span
              className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold border border-green-200 transition-transform duration-200 hover:scale-105"
              title="Doctor is available at clinic"
            >
              Clinic
            </span>
          )}
        </div>

        {/* Experience & Fee */}
        <div className="flex justify-center gap-4 text-sm font-medium text-gray-700 mb-3 items-center">
          <p
            data-testid="doctor-experience"
            className="flex items-center gap-1"
          >
            <BriefcaseIcon className="w-4 h-4 text-gray-500" />
            {doctor.experience} yrs
          </p>
          <p
            data-testid="doctor-fee"
            className="flex items-center gap-1 text-blue-700 font-semibold"
          >
            <CurrencyRupeeIcon className="w-4 h-4 text-blue-700" />
            {doctor.fee}
          </p>
        </div>

        {/* Introduction (Flexible height part) */}
        <div className="text-sm text-gray-700 min-h-[60px]">
          {doctor.doctor_introduction ? (
            <>
              {showMore ? doctor.doctor_introduction : shortIntro}
              {doctor.doctor_introduction.length > 200 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="ml-1 text-blue-500 font-medium underline hover:text-blue-700"
                >
                  {showMore ? "Show less" : "Read more"}
                </button>
              )}
            </>
          ) : (
            <span className="italic text-gray-400">
              No introduction provided.
            </span>
          )}
        </div>
      </div>

      {/* Spacer to push footer down */}
      <div className="flex-grow" />

      {/* Footer (Always bottom aligned) */}
      <div className="pt-3 border-t mt-4 text-xs text-gray-500 leading-tight space-y-1">
        <p>🏢 {clinicLine}</p>
        <p>🗣️ {doctor.languages?.join(", ")}</p>
      </div>
    </div>
  );
}

export default DoctorCard;
