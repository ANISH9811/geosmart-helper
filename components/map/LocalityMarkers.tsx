"use client";

import { Marker, Popup } from "react-leaflet";
import { Locality } from "../../types/locality";

interface Props {
  localities: Locality[];
}

export default function LocalityMarkers({
  localities,
}: Props) {
  return (
    <>
      {localities.map((locality) => (
        <Marker
          key={locality.id}
          position={[locality.rep_lat, locality.rep_lon]}
        >
          <Popup>
            <strong>{locality.locality}</strong>

            <br />

            {locality.district}

            <br />

            {locality.pincode}
          </Popup>
        </Marker>
      ))}
    </>
  );
}