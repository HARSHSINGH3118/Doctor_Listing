import { useState } from "react";

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
      className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
      data-testid="doctor-card"
    >
      <div className="p-4 flex flex-col gap-4 h-full">
        {/* Profile section */}
        <div className="flex items-start gap-4">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
          <div className="flex-1">
            <h2
              className="text-lg font-semibold text-gray-900"
              data-testid="doctor-name"
            >
              {doctor.name}
            </h2>

            {/* Badges below name, aligned left */}
            <div className="flex gap-2 mt-1 flex-wrap">
              {doctor.video_consult && (
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold border border-green-300 shadow-sm">
                  Video Consult
                </span>
              )}
              {doctor.in_clinic && (
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold border border-blue-300 shadow-sm">
                  In Clinic
                </span>
              )}
            </div>

            {/* Specialty + Experience + Fee */}
            <div className="mt-2 text-sm text-gray-800">
              <p data-testid="doctor-specialty">
                {doctor.specialties?.join(", ")}
              </p>
              <p data-testid="doctor-experience" className="mt-1">
                🧑‍⚕️ {doctor.experience} years experience
              </p>
              <p data-testid="doctor-fee">💰 Fee: ₹{doctor.fee}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm text-gray-800 leading-relaxed flex-grow min-h-[60px]">
          {doctor.doctor_introduction ? (
            <>
              {showMore ? doctor.doctor_introduction : shortIntro}
              {doctor.doctor_introduction.length > 200 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="ml-1 text-blue-600 font-medium underline hover:text-blue-800"
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

        {/* Footer */}
        <div className="pt-3 border-t text-xs text-gray-500 leading-tight space-y-1">
          <p>🏢 {clinicLine}</p>

          {doctor.clinic?.address?.location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${doctor.clinic.address.location}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline font-medium"
            >
              📍 View on Google Maps
            </a>
          )}

          <p>🗣️ {doctor.languages?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
