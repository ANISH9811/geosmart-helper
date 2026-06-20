"use client";

export default function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-white p-3 shadow border text-sm">
      <h4 className="font-semibold mb-2">Legend</h4>

      <div className="space-y-1">
        <div>🔴 Selected Apartment</div>
        <div>🟢 Nearby Apartments</div>
        <div>🔵 Other Listings</div>
      </div>
    </div>
  );
}