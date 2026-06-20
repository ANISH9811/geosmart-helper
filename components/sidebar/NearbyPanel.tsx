"use client";

import { NearbyApartment } from "@/types/nearbyApartment";
import AIInsights from "./AIInsights";
import TransitCard from "./TransitCard";
import { Apartment } from "@/types/apartment";
import KpiCards from "@/components/KpiCards";

interface Props {
  selectedApartment: string;
  selectedApartmentData: Apartment | null;
  apartments: NearbyApartment[];
  radius: number;
  setRadius: (radius: number) => void;
}

export default function NearbyPanel({
  selectedApartment,
  selectedApartmentData,
  apartments,
  radius,
  setRadius,
}: Props) {
  const averageDistance =
    apartments.length > 0
      ? apartments.reduce((sum, a) => sum + a.distance, 0) /
        apartments.length
      : 0;

  function getBadge(distance: number) {
    if (distance <= 1) return "🟢";
    if (distance <= 2) return "🟡";
    return "🔴";
  }

  return (
    <div className="absolute right-0 top-0 z-[1000] h-screen w-96 overflow-y-auto bg-white shadow-xl p-5">

      {/* Selected Apartment */}
      <div className="mb-6 rounded-xl bg-blue-50 p-4">
        <p className="text-sm text-gray-500">Selected Apartment</p>
        <h2 className="text-lg font-bold">
          {selectedApartment || "None"}
        </h2>
      </div>

      {/* KPI CARDS (NEW - BIG IMPROVEMENT) */}
      <KpiCards
        totalApartments={apartments.length}
        nearbyCount={apartments.length}
        avgDistance={averageDistance}
      />

      {/* Radius Filter */}
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold">Search Radius</p>

        <div className="flex gap-2">
          {[1, 2, 5].map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`rounded-lg px-3 py-2 text-sm ${
                radius === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Section Header */}
      <h2 className="mb-4 text-xl font-bold">
        Nearby Apartments
      </h2>

      {/* Empty State */}
      {apartments.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">📍 No nearby results</p>
          <p className="text-sm mt-1">
            Click an apartment marker to analyze surrounding area
          </p>
        </div>
      ) : (
        apartments.map((apartment) => (
          <div
            key={apartment.id}
            className="mb-4 rounded-xl border p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold">
              {apartment.name}
            </h3>

            <p className="text-sm text-gray-600">
              {apartment.locality}
            </p>

            <p className="mt-2 font-medium">
              {getBadge(apartment.distance)}{" "}
              {apartment.distance.toFixed(2)} km
            </p>

            <p className="text-sm">
              🚶 Walking: {apartment.walkingTime} mins
            </p>

            <p className="text-sm">
              🛵 Bike: {apartment.bikeTime} mins
            </p>
          </div>
        ))
      )}

      {/* AI Layer */}
      <AIInsights
        selectedApartment={selectedApartment}
        apartments={apartments}
      />

      {/* Transit Layer */}
      <TransitCard apartment={selectedApartmentData} />
    </div>
  );
}