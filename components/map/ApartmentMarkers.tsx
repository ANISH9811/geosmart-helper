"use client";

import { Marker, Popup } from "react-leaflet";

import { Apartment } from "@/types/apartment";
import { NearbyApartment } from "@/types/nearbyApartment";

import {
  defaultIcon,
  selectedIcon,
  nearbyIcon,
} from "@/lib/icons";

interface Props {
  apartments: Apartment[];
  nearbyApartments: NearbyApartment[];
  selectedApartment: Apartment | null;
  onSelect: (apartment: Apartment) => void;
}

export default function ApartmentMarkers({
  apartments,
  nearbyApartments,
  selectedApartment,
  onSelect,
}: Props) {
  return (
    <>
      {apartments.map((apartment) => {
        const isSelected =
          selectedApartment?.id === apartment.id;

        const isNearby = nearbyApartments.some(
          (a) => a.id === apartment.id
        );

        return (
          <Marker
            key={apartment.id}
            position={[apartment.lat, apartment.lon]}
            icon={
              isSelected
                ? selectedIcon
                : isNearby
                ? nearbyIcon
                : defaultIcon
            }
            eventHandlers={{
              click: () => onSelect(apartment),
            }}
          >
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold">
                  {apartment.name}
                </h3>

                <p>{apartment.locality}</p>

                {isSelected && (
                  <span className="text-red-600 font-semibold">
                    📍 Selected Apartment
                  </span>
                )}

                {!isSelected && isNearby && (
                  <span className="text-green-600 font-semibold">
                    ✅ Nearby Apartment
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}