import { supabase } from "../lib/supabase";
import { Locality } from "../types/locality";

export async function getLocalities(): Promise<Locality[]> {
  const { data, error } = await supabase
    .from("localities")
    .select("*")
    .order("locality");

  if (error) {
    throw error;
  }

  return data as Locality[];
}