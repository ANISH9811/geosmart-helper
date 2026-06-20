import { supabase } from "@/lib/supabase";
import { Apartment } from "@/types/apartment";

export async function getApartments(): Promise<Apartment[]> {
  const { data, error } = await supabase
    .from("apartments")
    .select("*");

  if (error) {
    console.error("Error fetching apartments:", error);
    return [];
  }

  return data as Apartment[];
}