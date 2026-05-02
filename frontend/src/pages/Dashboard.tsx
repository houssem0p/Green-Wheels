import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Bike, Calendar, CreditCard, Clock, MapPin, Loader2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Reservation = Tables<"reservations">;

const statusColors: Record<string, string> = {
  confirmed: "default",
  active: "default",
  completed: "secondary",
  cancelled: "destructive",
};
const statusLabels: Record<string, string> = {
  confirmed: "Confirmée",
  active: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

export default function Dashboard() {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && isAdmin) {
      navigate("/admin", { replace: true });
      return;
    }

    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchReservations = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);
    setReservations(data ?? []);
    setLoadingData(false);
  };

  useEffect(() => { fetchReservations(); }, [user]);

  const handleCancel = async (id: string) => {
    const { error } = await supabase
      .from("reservations")
      .update({ status: "cancelled" as any })
      .eq("id", id);
    if (error) { toast.error("Erreur: " + error.message); return; }

    // Automatic refund: mark associated payment as refunded
    const { error: refundError } = await supabase
      .from("payments")
      .update({ status: "refunded" as any })
      .eq("reservation_id", id)
      .eq("status", "completed" as any);
    
    if (refundError) {
      toast.warning("Réservation annulée, mais erreur lors du remboursement: " + refundError.message);
    } else {
      toast.success("Réservation annulée et remboursement effectué avec succès");
    }
    fetchReservations();
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeCount = reservations.filter((r) => r.status === "active" || r.status === "confirmed").length;
  const totalSpent = reservations.filter((r) => r.status !== "cancelled").reduce((s, r) => s + Number(r.total_price), 0);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Mon Espace</h1>
          <p className="text-muted-foreground">Gérez votre profil et vos réservations.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Mon Profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-display font-semibold text-lg">{profile?.full_name || "Utilisateur"}</h3>
                <p className="text-sm text-muted-foreground">{profile?.email || user.email}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Téléphone</span><span>{profile?.phone || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Adresse</span><span>{profile?.address || "—"}</span></div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Bike, label: "Réservations", value: reservations.length.toString() },
                { icon: Clock, label: "En cours", value: activeCount.toString() },
                { icon: CreditCard, label: "Dépensé", value: `${totalSpent.toLocaleString()} DA` },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4 text-center">
                    <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="font-display font-bold text-xl">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Mes Réservations</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bike className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune réservation pour le moment.</p>
                    <Button variant="outline" className="mt-3" onClick={() => navigate("/vehicles")}>
                      Louer un vélo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map((r) => (
                      <div key={r.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="font-medium">{r.duration_hours}h de location</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(r.start_date).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge variant={statusColors[r.status] as any}>{statusLabels[r.status]}</Badge>
                            <div className="text-sm font-medium mt-1">{Number(r.total_price).toLocaleString()} DA</div>
                          </div>
                          {(r.status === "confirmed" || r.status === "active") && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Annuler cette réservation ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. La réservation sera définitivement annulée.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Non, garder</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleCancel(r.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Oui, annuler
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
