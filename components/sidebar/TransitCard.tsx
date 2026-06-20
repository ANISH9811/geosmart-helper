"use client";

import { Apartment } from "@/types/apartment";
import { Transit } from "@/types/transit";
import { haversineDistance } from "@/utils/distance";
import { transitData } from "@/data/transit";

interface Props {
  apartment: Apartment | null;
}

export default function TransitCard({ apartment }: Props) {
  if (!apartment) return null;

  const nearbyTransit = transitData
    .map((stop) => ({
      ...stop,
      distance: haversineDistance(
        apartment.lat,
        apartment.lon,
        stop.lat,
        stop.lon
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  return (
    <div className="mt-6 rounded-xl border bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-bold">
        🚇 Nearby Transit
      </h2>

      {nearbyTransit.map((stop) => (
        <div
          key={stop.id}
          className="mb-3 rounded-lg bg-gray-50 p-3"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold">{stop.name}</h3>

            <span className="text-blue-600">
              {stop.type}
            </span>
          </div>

          <p className="text-sm text-gray-600">
            {stop.distance.toFixed(2)} km away
          </p>

          <p className="text-sm">
            🚶 {Math.round(stop.distance * 12)} mins
          </p>

          <p className="text-sm">
            🛵 {Math.round(stop.distance * 3)} mins
          </p>
        </div>
      ))}
    </div>
  );
}