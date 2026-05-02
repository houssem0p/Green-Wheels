import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bike, Battery, Zap, MapPin, Star, Clock, Shield, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ebikeImg from "@/assets/vehicle-ebike.jpg";
import bikeImg from "@/assets/vehicle-bike.jpg";
import scooterImg from "@/assets/vehicle-scooter.jpg";

const imageByType: Record<string, string> = {
  "Vélo électrique": ebikeImg,
  "Vélo classique": bikeImg,
  "Scooter électrique": scooterImg,
};

const mockVehicles: Record<string, any> = {
  "1": { name: "Vélo Urbain Pro", type: "Vélo électrique", price: 200, autonomy: "40 km", battery: 85, station: "Alger Centre", available: true, rating: 4.8, desc: "Le Vélo Urbain Pro est parfait pour les trajets quotidiens. Moteur puissant, batterie longue durée et design élégant.", specs: { weight: "22 kg", maxSpeed: "25 km/h", chargeTime: "3h", gears: "7 vitesses" } },
  "2": { name: "Scooter City", type: "Scooter électrique", price: 350, autonomy: "60 km", battery: 92, station: "Bab El Oued", available: true, rating: 4.6, desc: "Le Scooter City offre une expérience de conduite fluide et confortable pour vos déplacements urbains.", specs: { weight: "45 kg", maxSpeed: "45 km/h", chargeTime: "4h", gears: "Automatique" } },
  "3": { name: "Vélo Classic", type: "Vélo classique", price: 100, autonomy: "∞", battery: 100, station: "Hussein Dey", available: false, rating: 4.2, desc: "Un vélo classique fiable pour les amateurs de pédalage traditionnel.", specs: { weight: "14 kg", maxSpeed: "Variable", chargeTime: "N/A", gears: "21 vitesses" } },
  "4": { name: "E-Bike Sport", type: "Vélo électrique", price: 280, autonomy: "55 km", battery: 78, station: "Bir Mourad Raïs", available: true, rating: 4.9, desc: "Un vélo électrique sportif pour les amateurs de performance.", specs: { weight: "20 kg", maxSpeed: "28 km/h", chargeTime: "3h30", gears: "9 vitesses" } },
  "5": { name: "Scooter Express", type: "Scooter électrique", price: 400, autonomy: "80 km", battery: 95, station: "El Harrach", available: true, rating: 4.7, desc: "Un scooter rapide et autonome pour vos longs trajets.", specs: { weight: "50 kg", maxSpeed: "50 km/h", chargeTime: "5h", gears: "Automatique" } },
  "6": { name: "Vélo Eco", type: "Vélo classique", price: 80, autonomy: "∞", battery: 100, station: "Kouba", available: true, rating: 4.3, desc: "Un vélo écologique et économique pour vos balades.", specs: { weight: "13 kg", maxSpeed: "Variable", chargeTime: "N/A", gears: "18 vitesses" } },
  "7": { name: "E-Scooter Lite", type: "Scooter électrique", price: 300, autonomy: "45 km", battery: 60, station: "Alger Centre", available: true, rating: 4.5, desc: "Un scooter léger et maniable pour la ville.", specs: { weight: "40 kg", maxSpeed: "40 km/h", chargeTime: "3h", gears: "Automatique" } },
  "8": { name: "Vélo Cargo", type: "Vélo électrique", price: 250, autonomy: "35 km", battery: 70, station: "Bab El Oued", available: false, rating: 4.1, desc: "Un vélo cargo pour transporter vos charges facilement.", specs: { weight: "30 kg", maxSpeed: "25 km/h", chargeTime: "4h", gears: "8 vitesses" } },
};

export default function VehicleDetails() {
  const { id } = useParams();
  const v = mockVehicles[id || "1"] || mockVehicles["1"];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Retour aux véhicules
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl overflow-hidden aspect-square">
            <img
              src={imageByType[v.type]}
              alt={v.name}
              width={1200}
              height={1200}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-3xl font-bold">{v.name}</h1>
              <Badge variant={v.available ? "default" : "secondary"}>
                {v.available ? "Disponible" : "Indisponible"}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{v.type}</p>
            <div className="flex items-center gap-1 mb-6">
              <Star className="h-4 w-4 text-warning fill-current" />
              <span className="font-medium">{v.rating}</span>
              <span className="text-muted-foreground text-sm">(128 avis)</span>
            </div>
            <p className="text-muted-foreground mb-6">{v.desc}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <Zap className="h-5 w-5 text-primary" />
                <div><div className="text-xs text-muted-foreground">Autonomie</div><div className="font-medium">{v.autonomy}</div></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <Battery className="h-5 w-5 text-primary" />
                <div><div className="text-xs text-muted-foreground">Batterie</div><div className="font-medium">{v.battery}%</div></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <MapPin className="h-5 w-5 text-primary" />
                <div><div className="text-xs text-muted-foreground">Station</div><div className="font-medium">{v.station}</div></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <Shield className="h-5 w-5 text-primary" />
                <div><div className="text-xs text-muted-foreground">Assurance</div><div className="font-medium">Incluse</div></div>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-display font-semibold mb-3">Spécifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Poids :</span> {v.specs.weight}</div>
                  <div><span className="text-muted-foreground">Vitesse max :</span> {v.specs.maxSpeed}</div>
                  <div><span className="text-muted-foreground">Temps de charge :</span> {v.specs.chargeTime}</div>
                  <div><span className="text-muted-foreground">Vitesses :</span> {v.specs.gears}</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-display font-bold text-primary">{v.price} DA</span>
                <span className="text-muted-foreground">/heure</span>
              </div>
              <Link to={`/reservations/new?vehicle=${id}`}>
                <Button size="lg" disabled={!v.available} className="gap-2">
                  <Calendar className="h-5 w-5" /> Réserver maintenant
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
