export interface Transit {
    id: string;
    type: "Metro" | "Bus";
    name: string;
    lat: number;
    lon: number;
  }