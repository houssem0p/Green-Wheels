import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Maintenance = Tables<"maintenance">;
type Vehicle = Tables<"vehicles">;

const priorityLabels: Record<string, string> = { low: "Basse", medium: "Moyenne", high: "Haute", urgent: "Urgente" };
const priorityColors: Record<string, string> = { low: "bg-muted text-muted-foreground", medium: "bg-accent text-accent-foreground", high: "bg-destructive/10 text-destructive", urgent: "bg-destructive text-destructive-foreground" };
const statusLabels: Record<string, string> = { pending: "En attente", in_progress: "En cours", completed: "Terminée" };
const statusColors: Record<string, string> = { pending: "bg-accent text-accent-foreground", in_progress: "bg-primary/10 text-primary", completed: "bg-muted text-muted-foreground" };

export default function AdminMaintenance() {
  const [tasks, setTasks] = useState<(Maintenance & { vehicle_name?: string })[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  const [vehicleId, setVehicleId] = useState("");
  const [type, setType] = useState("repair");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("medium");
  const [scheduledDate, setScheduledDate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const [{ data: mData }, { data: vData }] = await Promise.all([
      supabase.from("maintenance").select("*").order("created_at", { ascending: false }),
      supabase.from("vehicles").select("*"),
    ]);
    const vehicleMap = new Map((vData || []).map((v) => [v.id, v.name]));
    setTasks((mData || []).map((m) => ({ ...m, vehicle_name: vehicleMap.get(m.vehicle_id) || "Inconnu" })));
    setVehicles(vData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!vehicleId) { toast.error("Veuillez sélectionner un véhicule"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("maintenance").insert({
      vehicle_id: vehicleId,
      type,
      description: description || null,
      priority: priority as any,
      scheduled_date: scheduledDate || null,
    });
    setSubmitting(false);
    if (error) { toast.error("Erreur: " + error.message); return; }
    toast.success("Tâche de maintenance créée !");
    setOpen(false);
    setVehicleId(""); setDescription(""); setPriority("medium"); setScheduledDate(""); setType("repair");
    fetchData();
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    setUpdatingStatusId(taskId);
    const { error } = await supabase.from("maintenance").update({ status: status as any }).eq("id", taskId);
    setUpdatingStatusId(null);

    if (error) {
      toast.error("Impossible de changer le statut: " + error.message);
      return;
    }

    setTasks((currentTasks) => currentTasks.map((task) => (task.id === taskId ? { ...task, status } : task)));
    toast.success("Statut mis à jour");
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Maintenance</h1>
          <p className="text-muted-foreground">Suivi de la maintenance des véhicules.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Wrench className="h-4 w-4" /> Nouvelle tâche</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle tâche de maintenance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Véhicule *</Label>
                <Select value={vehicleId} onValueChange={setVehicleId}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner un véhicule" /></SelectTrigger>
                  <SelectContent>
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} value={v.id}>{v.name} ({v.type})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="repair">Réparation</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="cleaning">Nettoyage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez le problème..." />
              </div>
              <div className="space-y-2">
                <Label>Date planifiée</Label>
                <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
              </div>
              <Button onClick={handleSubmit} disabled={submitting} className="w-full">
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Créer la tâche
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : tasks.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">Aucune tâche de maintenance.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead>
                  <TableHead>Priorité</TableHead><TableHead>Date</TableHead><TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.vehicle_name}</TableCell>
                    <TableCell className="capitalize">{m.type}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{m.description || "-"}</TableCell>
                    <TableCell><span className={`text-xs px-2 py-1 rounded-full ${priorityColors[m.priority] || ""}`}>{priorityLabels[m.priority] || m.priority}</span></TableCell>
                    <TableCell>{m.scheduled_date ? new Date(m.scheduled_date).toLocaleDateString("fr-FR") : "-"}</TableCell>
                    <TableCell>
                      <Select value={m.status} onValueChange={(value) => handleStatusChange(m.id, value)} disabled={updatingStatusId === m.id}>
                        <SelectTrigger className={`h-8 min-w-[140px] ${statusColors[m.status] || ""}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminée</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
