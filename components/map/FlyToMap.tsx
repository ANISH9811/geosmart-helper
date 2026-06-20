"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  lat: number;
  lon: number;
}

export default function FlyToMap({ lat, lon }: Props) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lon], 15, {
      duration: 1.5,
    });
  }, [lat, lon, map]);

  return null;
}