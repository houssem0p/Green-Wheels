import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Bike, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Vehicle = Tables<"vehicles">;
type Station = Tables<"stations">;

export default function NewReservation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedVehicleId = searchParams.get("vehicle");
  const { user, loading: authLoading } = useAuth();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<string>(preselectedVehicleId || "");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState("1");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    async function fetchData() {
      const [vRes, sRes] = await Promise.all([
        supabase.from("vehicles").select("*").eq("status", "available"),
        supabase.from("stations").select("*").eq("status", "active"),
      ]);
      setVehicles(vRes.data || []);
      setStations(sRes.data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const vehicle = vehicles.find((v) => v.id === selectedVehicle);
  const station = vehicle ? stations.find((s) => s.id === vehicle.station_id) : null;
  const durationHours = parseInt(duration) || 1;
  const totalPrice = vehicle ? vehicle.price_per_hour * durationHours : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !vehicle || !startDate) return;

    setSubmitting(true);
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

    const { error } = await supabase.from("reservations").insert({
      user_id: user.id,
      vehicle_id: vehicle.id,
      station_id: vehicle.station_id,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      duration_hours: durationHours,
      total_price: totalPrice,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Erreur lors de la réservation: " + error.message);
    } else {
      setSuccess(true);
      toast.success("Réservation confirmée !");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold mb-4">Réservation confirmée !</h1>
          <p className="text-muted-foreground mb-2">
            <strong>{vehicle?.name}</strong> — {durationHours}h — {totalPrice} DA
          </p>
          <p className="text-muted-foreground mb-8">
            {startDate} à {startTime}
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button>Voir mes réservations</Button>
            </Link>
            <Link to="/vehicles">
              <Button variant="outline">Retour aux véhicules</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Retour aux véhicules
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-8">Nouvelle réservation</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bike className="h-5 w-5 text-primary" /> Véhicule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vehicles.length === 0 ? (
                  <p className="text-muted-foreground">Aucun véhicule disponible pour le moment.</p>
                ) : (
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.name} — {v.type} — {v.price_per_hour} DA/h
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {vehicle && station && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> Station : {station.name} — {station.address}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" /> Date & Heure
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure de début</Label>
                  <Input
                    id="time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" /> Durée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 6, 8, 12, 24].map((h) => (
                      <SelectItem key={h} value={String(h)}>
                        {h} heure{h > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Summary */}
            {vehicle && startDate && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold mb-3">Récapitulatif</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Véhicule</span>
                      <span className="font-medium">{vehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{startDate} à {startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée</span>
                      <span className="font-medium">{durationHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tarif</span>
                      <span className="font-medium">{vehicle.price_per_hour} DA × {durationHours}h</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-display font-bold text-primary text-lg">{totalPrice} DA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!selectedVehicle || !startDate || submitting}
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Réservation en cours...</>
              ) : (
                `Confirmer la réservation — ${totalPrice} DA`
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
