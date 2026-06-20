"use client";

import { Circle } from "react-leaflet";

interface Props {
  lat: number;
  lon: number;
  radius: number;
}

export default function RadiusCircle({
  lat,
  lon,
  radius,
}: Props) {
  return (
    <Circle
      center={[lat, lon]}
      radius={radius * 1000}
      pathOptions={{
        color: "#2563eb",
        fillColor: "#3b82f6",
        fillOpacity: 0.15,
        weight: 2,
      }}
    />
  );
}