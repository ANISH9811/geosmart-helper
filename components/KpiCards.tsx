"use client";

interface Props {
  totalApartments: number;
  nearbyCount: number;
  avgDistance: number;
}

export default function KpiCards({
  totalApartments,
  nearbyCount,
  avgDistance,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="rounded-xl border bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Total Apartments</p>
        <h3 className="text-2xl font-bold">{totalApartments}</h3>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Nearby Results</p>
        <h3 className="text-2xl font-bold">{nearbyCount}</h3>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Avg Distance</p>
        <h3 className="text-2xl font-bold">
          {avgDistance.toFixed(1)} km
        </h3>
      </div>
    </div>
  );
}