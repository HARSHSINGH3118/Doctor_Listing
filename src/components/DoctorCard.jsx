// src/components/DoctorCard.jsx
import React from "react";

function DoctorCard({ doctor }) {
  return (
    <div
      className="p-4 border rounded shadow-sm bg-white"
      data-testid="doctor-card"
    >
      <h2 className="text-lg font-semibold" data-testid="doctor-name">
        {doctor.name}
      </h2>

      <p className="text-sm text-gray-600 mt-1" data-testid="doctor-specialty">
        {doctor.specialties?.join(", ")}
      </p>

      <p className="text-sm mt-2" data-testid="doctor-experience">
        Experience: {doctor.experience} years
      </p>

      <p className="text-sm mt-1" data-testid="doctor-fee">
        Fee: ₹{doctor.fee}
      </p>
    </div>
  );
}

export default DoctorCard;
