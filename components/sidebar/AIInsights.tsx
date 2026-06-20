"use client";

import { NearbyApartment } from "@/types/nearbyApartment";

interface Props {
  selectedApartment: string;
  apartments: NearbyApartment[];
}

export default function AIInsights({
  selectedApartment,
  apartments,
}: Props) {
  if (!selectedApartment) return null;

  const count = apartments.length;

  const avgDistance =
    count > 0
      ? apartments.reduce((sum, a) => sum + a.distance, 0) / count
      : 0;

  let score = 40;

  if (count >= 8) score += 30;
  else if (count >= 5) score += 20;
  else if (count >= 3) score += 10;

  if (avgDistance <= 1) score += 20;
  else if (avgDistance <= 2) score += 10;

  score = Math.min(score, 100);

  let priority = "Low";
  let color = "text-red-600";

  if (score >= 80) {
    priority = "High";
    color = "text-green-600";
  } else if (score >= 60) {
    priority = "Medium";
    color = "text-yellow-600";
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-bold">
        🤖 AI Sourcing Insight
      </h2>

      <div className="mb-3">
        <p className="text-sm text-gray-500">
          Recommended Priority
        </p>

        <h3 className={`text-2xl font-bold ${color}`}>
          {priority}
        </h3>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-500">
          Sourcing Score
        </p>

        <h3 className="text-3xl font-bold">
          {score}/100
        </h3>
      </div>

      <ul className="space-y-2 text-sm">
        <li>✅ Nearby Apartments: {count}</li>
        <li>📍 Avg Distance: {avgDistance.toFixed(1)} km</li>

        <li>
          💡 Recommendation:
          {priority === "High"
            ? " Strong sourcing potential."
            : priority === "Medium"
            ? " Worth visiting."
            : " Low priority compared to other areas."}
        </li>
      </ul>
    </div>
  );
}