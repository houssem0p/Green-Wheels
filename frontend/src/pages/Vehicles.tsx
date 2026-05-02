import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Bike, Zap, Battery, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import ebikeImg from "@/assets/vehicle-ebike.jpg";
import bikeImg from "@/assets/vehicle-bike.jpg";
import scooterImg from "@/assets/vehicle-scooter.jpg";

const imageByType: Record<string, string> = {
  "Vélo électrique": ebikeImg,
  "Vélo classique": bikeImg,
  "Scooter électrique": scooterImg,
};

const mockVehicles = [
  { id: "1", name: "Vélo Urbain Pro", type: "Vélo électrique", price: 200, autonomy: "40 km", battery: 85, station: "Alger Centre", available: true, rating: 4.8 },
  { id: "2", name: "Scooter City", type: "Scooter électrique", price: 350, autonomy: "60 km", battery: 92, station: "Bab El Oued", available: true, rating: 4.6 },
  { id: "3", name: "Vélo Classic", type: "Vélo classique", price: 100, autonomy: "∞", battery: 100, station: "Hussein Dey", available: false, rating: 4.2 },
  { id: "4", name: "E-Bike Sport", type: "Vélo électrique", price: 280, autonomy: "55 km", battery: 78, station: "Bir Mourad Raïs", available: true, rating: 4.9 },
  { id: "5", name: "Scooter Express", type: "Scooter électrique", price: 400, autonomy: "80 km", battery: 95, station: "El Harrach", available: true, rating: 4.7 },
  { id: "6", name: "Vélo Eco", type: "Vélo classique", price: 80, autonomy: "∞", battery: 100, station: "Kouba", available: true, rating: 4.3 },
  { id: "7", name: "E-Scooter Lite", type: "Scooter électrique", price: 300, autonomy: "45 km", battery: 60, station: "Alger Centre", available: true, rating: 4.5 },
  { id: "8", name: "Vélo Cargo", type: "Vélo électrique", price: 250, autonomy: "35 km", battery: 70, station: "Bab El Oued", available: false, rating: 4.1 },
];

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [availFilter, setAvailFilter] = useState("all");

  const filtered = mockVehicles.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || v.type === typeFilter;
    const matchAvail = availFilter === "all" || (availFilter === "available" ? v.available : !v.available);
    return matchSearch && matchType && matchAvail;
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Nos Véhicules</h1>
          <p className="text-muted-foreground">Trouvez le véhicule parfait pour votre trajet.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un véhicule..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="Vélo électrique">Vélo électrique</SelectItem>
              <SelectItem value="Vélo classique">Vélo classique</SelectItem>
              <SelectItem value="Scooter électrique">Scooter électrique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/10 aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={imageByType[v.type]}
                      alt={v.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold">{v.name}</h3>
                      <Badge variant={v.available ? "default" : "secondary"}>
                        {v.available ? "Disponible" : "Indisponible"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{v.type}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1"><Zap className="h-3 w-3" /> {v.autonomy}</div>
                      <div className="flex items-center gap-1"><Battery className="h-3 w-3" /> {v.battery}%</div>
                      <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {v.station}</div>
                      <div className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" /> {v.rating}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-lg text-primary">{v.price} DA/h</span>
                      <Link to={`/vehicles/${v.id}`}>
                        <Button size="sm" disabled={!v.available}>Détails</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Aucun véhicule trouvé.</div>
        )}
      </div>
    </div>
  );
}
