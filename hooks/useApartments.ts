"use client";

import { useEffect, useState } from "react";
import { Apartment } from "@/types/apartment";
import { getApartments } from "@/services/apartmentService";

export function useApartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApartments() {
      const data = await getApartments();
      setApartments(data);
      setLoading(false);
    }

    loadApartments();
  }, []);

  return {
    apartments,
    loading,
  };
}