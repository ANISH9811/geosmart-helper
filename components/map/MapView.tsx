"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapView() {
  return <LeafletMap />;
}