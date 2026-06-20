"use client";

import { useEffect, useState } from "react";
import { Locality } from "../types/locality";
import { getLocalities } from "@/services/localityService";

export function useLocalities() {
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getLocalities();
        setLocalities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    localities,
    loading,
  };
}