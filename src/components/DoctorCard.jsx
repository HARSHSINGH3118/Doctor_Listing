function DoctorCard({ doctor }) {
  return (
    <div
      className="p-4 border rounded shadow-sm bg-white"
      data-testid="doctor-card"
    >
      <div className="flex gap-4">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold" data-testid="doctor-name">
            {doctor.name}
          </h2>
          <p className="text-sm text-gray-600" data-testid="doctor-specialty">
            {doctor.specialties?.join(", ")}
          </p>
          <p className="text-sm mt-2" data-testid="doctor-experience">
            Experience: {doctor.experience} years
          </p>
          <p className="text-sm mt-1" data-testid="doctor-fee">
            Fee: ₹{doctor.fee}
          </p>
        </div>
      </div>

      {doctor.doctor_introduction && (
        <p className="text-sm mt-3 text-gray-700">
          {doctor.doctor_introduction}
        </p>
      )}

      <p className="text-xs mt-2 text-gray-500">
        Clinic: {doctor.clinic?.name}, {doctor.clinic?.address?.city}
      </p>
      <p className="text-xs text-gray-500">
        Languages: {doctor.languages?.join(", ")}
      </p>
    </div>
  );
}

export default DoctorCard;
