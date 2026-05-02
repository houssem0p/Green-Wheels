import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Bike, Clock } from "lucide-react";
import "leaflet/dist/leaflet.css";

const mockStations = [
  { id: 1, name: "Alger Centre", lat: 36.7538, lng: 3.0588, bikes: 12, slots: 20, hours: "6h-23h" },
  { id: 2, name: "Bab El Oued", lat: 36.7900, lng: 3.0500, bikes: 8, slots: 15, hours: "6h-22h" },
  { id: 3, name: "Hussein Dey", lat: 36.7400, lng: 3.1000, bikes: 5, slots: 10, hours: "7h-21h" },
  { id: 4, name: "Bir Mourad Raïs", lat: 36.7300, lng: 3.0400, bikes: 10, slots: 18, hours: "6h-23h" },
  { id: 5, name: "El Harrach", lat: 36.7200, lng: 3.1400, bikes: 7, slots: 12, hours: "7h-22h" },
  { id: 6, name: "Kouba", lat: 36.7250, lng: 3.0750, bikes: 6, slots: 14, hours: "6h-22h" },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    const init = async () => {
      const L = await import("leaflet");
      
      // Fix default icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (!mapRef.current) return;
      map = L.map(mapRef.current).setView([36.7538, 3.0588], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const greenIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      mockStations.forEach((s) => {
        L.marker([s.lat, s.lng], { icon: greenIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif"><strong>${s.name}</strong><br/>🚲 ${s.bikes} vélos disponibles<br/>📍 ${s.slots} emplacements<br/>🕐 ${s.hours}</div>`
          );
      });
    };
    init();
    return () => { if (map) map.remove(); };
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Carte des Stations</h1>
          <p className="text-muted-foreground">Trouvez la station la plus proche de vous.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div ref={mapRef} className="h-[500px] rounded-xl border border-border overflow-hidden" />
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {mockStations.map((s) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> {s.name}
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><Bike className="h-3 w-3" /> {s.bikes} vélos</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.hours}</div>
                </div>
                <div className="mt-2 bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${(s.bikes / s.slots) * 100}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{s.bikes}/{s.slots} emplacements occupés</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
