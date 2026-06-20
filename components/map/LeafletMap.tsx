"use client";

import { useState, useMemo } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import RadiusCircle from "./RadiusCircle";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useLocalities } from "@/hooks/useLocalities";
import { useApartments } from "@/hooks/useApartments";

import { Apartment } from "@/types/apartment";
import { NearbyApartment } from "@/types/nearbyApartment";

import { haversineDistance } from "@/utils/distance";

import LocalityMarkers from "./LocalityMarkers";
import ApartmentMarkers from "./ApartmentMarkers";
import FlyToMap from "./FlyToMap";

import SearchBar from "../search/SearchBar";
import NearbyPanel from "../sidebar/NearbyPanel";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function LeafletMap() {
  const { localities, loading: localitiesLoading } = useLocalities();
  const { apartments, loading: apartmentsLoading } = useApartments();

  const [selectedLat, setSelectedLat] = useState(12.9716);
  const [selectedLon, setSelectedLon] = useState(77.5946);

  const [selectedApartment, setSelectedApartment] =
    useState<Apartment | null>(null);

  const [selectedApartmentName, setSelectedApartmentName] =
    useState<string>("");

  const [radius, setRadius] = useState<number>(2);

  const [nearbyApartments, setNearbyApartments] = useState<
    NearbyApartment[]
  >([]);

  // 📍 NEW: user location state
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // 📊 Derived metric
  const avgNearbyDistance = useMemo(() => {
    if (nearbyApartments.length === 0) return 0;

    return (
      nearbyApartments.reduce((sum, a) => sum + a.distance, 0) /
      nearbyApartments.length
    );
  }, [nearbyApartments]);

  // 📍 GPS handler
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserLocation({
          lat: latitude,
          lon: longitude,
        });

        setSelectedLat(latitude);
        setSelectedLon(longitude);
      },
      (error) => {
        console.error(error);
        alert("Unable to fetch location");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  // 📍 core calculation engine
  const calculateNearbyApartments = (
    apartment: Apartment,
    selectedRadius: number
  ) => {
    const nearby = apartments
      .filter((a) => a.id !== apartment.id)
      .map((a) => {
        const distance = haversineDistance(
          apartment.lat,
          apartment.lon,
          a.lat,
          a.lon
        );

        return {
          ...a,
          distance,
          walkingTime: Math.round(distance * 12),
          bikeTime: Math.round(distance * 3),
        };
      })
      .filter((a) => a.distance <= selectedRadius)
      .sort((a, b) => a.distance - b.distance);

    setNearbyApartments(nearby);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const apartment = apartments.find((a) =>
      a.name.toLowerCase().includes(query.toLowerCase())
    );

    if (apartment) {
      setSelectedLat(apartment.lat);
      setSelectedLon(apartment.lon);
      return;
    }

    const locality = localities.find((l) =>
      l.locality.toLowerCase().includes(query.toLowerCase())
    );

    if (locality) {
      setSelectedLat(locality.rep_lat);
      setSelectedLon(locality.rep_lon);
    }
  };

  const handleApartmentClick = (selected: Apartment) => {
    setSelectedApartment(selected);
    setSelectedApartmentName(selected.name);

    setSelectedLat(selected.lat);
    setSelectedLon(selected.lon);

    calculateNearbyApartments(selected, radius);
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);

    if (selectedApartment) {
      calculateNearbyApartments(selectedApartment, newRadius);
    }
  };

  if (localitiesLoading || apartmentsLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Loading GeoSmart...
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">

      {/* 📍 GPS Button */}
      <div className="absolute top-4 left-4 z-[1000]">
        <button
          onClick={handleUseMyLocation}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        >
          📍 Use My Location
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      <NearbyPanel
        selectedApartment={selectedApartmentName || "None"}
        selectedApartmentData={selectedApartment}
        apartments={nearbyApartments}
        radius={radius}
        setRadius={handleRadiusChange}
      />

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        scrollWheelZoom
        className="h-screen w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToMap lat={selectedLat} lon={selectedLon} />

        {/* 📍 User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]}>
            <Popup>📍 You are here</Popup>
          </Marker>
        )}

        {selectedApartment && (
          <RadiusCircle
            lat={selectedApartment.lat}
            lon={selectedApartment.lon}
            radius={radius}
          />
        )}

        <LocalityMarkers localities={localities} />

        <ApartmentMarkers
          apartments={apartments}
          selectedApartment={selectedApartment}
          nearbyApartments={nearbyApartments}
          onSelect={handleApartmentClick}
        />
      </MapContainer>
    </div>
  );
}