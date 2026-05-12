"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { 
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">
      Завантаження карти...
    </div>
  )
});

interface ClientMapProps {
  latitude: number;
  longitude: number;
}

export default function ClientMap({ latitude, longitude }: ClientMapProps) {
  return <MapView latitude={latitude} longitude={longitude} />;
}