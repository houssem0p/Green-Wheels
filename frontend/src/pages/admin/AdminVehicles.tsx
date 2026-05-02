import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search, Bike, Battery, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  price: number;
  battery: number;
  station: string;
  status: string;
  autonomy: string;
}

const defaultVehicles: Vehicle[] = [
  { id: "V001", name: "Vélo Urbain Pro", type: "Vélo électrique", price: 200, battery: 85, station: "Alger Centre", status: "disponible", autonomy: "45 km" },
  { id: "V002", name: "Scooter City", type: "Scooter électrique", price: 350, battery: 92, station: "Bab El Oued", status: "loué", autonomy: "60 km" },
  { id: "V003", name: "Vélo Classic", type: "Vélo classique", price: 100, battery: 100, station: "Hussein Dey", status: "maintenance", autonomy: "N/A" },
  { id: "V004", name: "E-Bike Sport", type: "Vélo électrique", price: 280, battery: 78, station: "Kouba", status: "disponible", autonomy: "50 km" },
  { id: "V005", name: "Scooter Express", type: "Scooter électrique", price: 400, battery: 95, station: "El Harrach", status: "disponible", autonomy: "70 km" },
  { id: "V006", name: "Vélo Touring", type: "Vélo électrique", price: 250, battery: 60, station: "Alger Centre", status: "loué", autonomy: "40 km" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive"> = {
  disponible: "default",
  loué: "secondary",
  maintenance: "destructive",
};

const stations = ["Alger Centre", "Bab El Oued", "Hussein Dey", "Kouba", "El Harrach"];

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(defaultVehicles);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", price: "", station: "", autonomy: "" });
  const { toast } = useToast();

  const filtered = vehicles.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const availableCount = vehicles.filter(v => v.status === "disponible").length;
  const rentedCount = vehicles.filter(v => v.status === "loué").length;
  const maintenanceCount = vehicles.filter(v => v.status === "maintenance").length;

  const handleAdd = () => {
    if (!form.name || !form.type || !form.price || !form.station) return;
    const newVehicle: Vehicle = {
      id: `V${String(vehicles.length + 1).padStart(3, "0")}`,
      name: form.name,
      type: form.type,
      price: Number(form.price),
      battery: 100,
      station: form.station,
      status: "disponible",
      autonomy: form.autonomy || "N/A",
    };
    setVehicles([...vehicles, newVehicle]);
    setForm({ name: "", type: "", price: "", station: "", autonomy: "" });
    setAddOpen(false);
    toast({ title: "Véhicule ajouté", description: `${newVehicle.name} a été ajouté à la flotte.` });
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({ title: "Véhicule supprimé", variant: "destructive" });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v));
    toast({ title: "Statut mis à jour" });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Véhicules</h1>
          <p className="text-muted-foreground">Gérez les véhicules de la flotte GreenWheels.</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Ajouter un véhicule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un véhicule</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Nom</Label><Input placeholder="Nom du véhicule" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue placeholder="Choisir le type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vélo électrique">Vélo électrique</SelectItem>
                    <SelectItem value="Vélo classique">Vélo classique</SelectItem>
                    <SelectItem value="Scooter électrique">Scooter électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Prix (DA/h)</Label><Input type="number" placeholder="200" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
                <div className="space-y-2"><Label>Autonomie</Label><Input placeholder="45 km" value={form.autonomy} onChange={e => setForm({ ...form, autonomy: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Station</Label>
                <Select value={form.station} onValueChange={v => setForm({ ...form, station: v })}>
                  <SelectTrigger><SelectValue placeholder="Choisir la station" /></SelectTrigger>
                  <SelectContent>
                    {stations.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
              <Button onClick={handleAdd}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Bike className="h-5 w-5 text-primary" /></div>
            <div><p className="text-2xl font-bold">{vehicles.length}</p><p className="text-xs text-muted-foreground">Total</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Battery className="h-5 w-5 text-primary" /></div>
            <div><p className="text-2xl font-bold">{availableCount}</p><p className="text-xs text-muted-foreground">Disponibles</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-chart-2" /></div>
            <div><p className="text-2xl font-bold">{rentedCount}</p><p className="text-xs text-muted-foreground">Loués</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center"><Edit className="h-5 w-5 text-destructive" /></div>
            <div><p className="text-2xl font-bold">{maintenanceCount}</p><p className="text-xs text-muted-foreground">Maintenance</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un véhicule..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="disponible">Disponible</SelectItem>
            <SelectItem value="loué">Loué</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Nom</TableHead><TableHead>Type</TableHead>
                <TableHead>Prix/h</TableHead><TableHead>Batterie</TableHead><TableHead>Autonomie</TableHead>
                <TableHead>Station</TableHead><TableHead>État</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-mono text-xs">{v.id}</TableCell>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-sm">{v.type}</TableCell>
                  <TableCell>{v.price} DA</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${v.battery > 50 ? "bg-primary" : v.battery > 20 ? "bg-chart-4" : "bg-destructive"}`} style={{ width: `${v.battery}%` }} />
                      </div>
                      <span className="text-xs">{v.battery}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{v.autonomy}</TableCell>
                  <TableCell>{v.station}</TableCell>
                  <TableCell>
                    <Select value={v.status} onValueChange={(val) => handleStatusChange(v.id, val)}>
                      <SelectTrigger className="h-7 w-[130px]">
                        <Badge variant={statusBadge[v.status]}>{v.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponible">Disponible</SelectItem>
                        <SelectItem value="loué">Loué</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditVehicle(v)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(v.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Aucun véhicule trouvé.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
