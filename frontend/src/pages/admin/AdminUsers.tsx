import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, Shield, UserPlus, Eye, Ban, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string; name: string; email: string; phone: string;
  role: string; status: string; joined: string; rentals: number;
}

const initialUsers: User[] = [
  { id: "U001", name: "Karim Benali", email: "karim@mail.com", phone: "+213 555 111 111", role: "user", status: "active", joined: "2026-01-15", rentals: 12 },
  { id: "U002", name: "Sarah Meziane", email: "sarah@mail.com", phone: "+213 555 222 222", role: "admin", status: "active", joined: "2025-12-01", rentals: 5 },
  { id: "U003", name: "Ahmed Khelifi", email: "ahmed@mail.com", phone: "+213 555 333 333", role: "user", status: "suspended", joined: "2026-02-10", rentals: 3 },
  { id: "U004", name: "Amina Rahal", email: "amina@mail.com", phone: "+213 555 444 444", role: "technician", status: "active", joined: "2026-01-20", rentals: 0 },
  { id: "U005", name: "Yacine Larbi", email: "yacine@mail.com", phone: "+213 555 555 555", role: "manager", status: "active", joined: "2025-11-05", rentals: 8 },
  { id: "U006", name: "Fatima Zahra", email: "fatima@mail.com", phone: "+213 555 666 666", role: "user", status: "active", joined: "2026-03-01", rentals: 15 },
];

const roleColors: Record<string, string> = {
  admin: "bg-destructive/10 text-destructive",
  user: "bg-primary/10 text-primary",
  technician: "bg-chart-4/10 text-chart-4",
  manager: "bg-chart-3/10 text-chart-3",
};

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [detail, setDetail] = useState<User | null>(null);
  const { toast } = useToast();

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleSuspend = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
    toast({ title: "Statut utilisateur mis à jour" });
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    toast({ title: "Utilisateur supprimé", variant: "destructive" });
  };

  const handleRoleChange = (id: string, role: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
    toast({ title: "Rôle mis à jour" });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Utilisateurs</h1>
        <p className="text-muted-foreground">Gérez les utilisateurs de la plateforme.</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold">{users.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Actifs</p><p className="text-2xl font-bold text-primary">{users.filter(u => u.status === "active").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Suspendus</p><p className="text-2xl font-bold text-destructive">{users.filter(u => u.status === "suspended").length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Locations totales</p><p className="text-2xl font-bold">{users.reduce((s, u) => s + u.rentals, 0)}</p></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un utilisateur..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">Utilisateur</SelectItem>
            <SelectItem value="technician">Technicien</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Nom</TableHead><TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead><TableHead>Rôle</TableHead><TableHead>Statut</TableHead>
                <TableHead>Locations</TableHead><TableHead>Inscription</TableHead><TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono text-xs">{u.id}</TableCell>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>
                    <Select value={u.role} onValueChange={(v) => handleRoleChange(u.id, v)}>
                      <SelectTrigger className="h-7 w-[120px]">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[u.role]}`}>{u.role}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="technician">Technicien</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.status === "active" ? "default" : "destructive"}>
                      {u.status === "active" ? "Actif" : "Suspendu"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{u.rentals}</TableCell>
                  <TableCell className="text-sm">{u.joined}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setDetail(u)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleSuspend(u.id)}>
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(u.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Profil de {detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Email</span><p className="font-medium">{detail.email}</p></div>
                <div><span className="text-muted-foreground">Téléphone</span><p className="font-medium">{detail.phone}</p></div>
                <div><span className="text-muted-foreground">Rôle</span><p className="font-medium capitalize">{detail.role}</p></div>
                <div><span className="text-muted-foreground">Inscription</span><p className="font-medium">{detail.joined}</p></div>
                <div><span className="text-muted-foreground">Locations</span><p className="font-medium">{detail.rentals} locations</p></div>
                <div><span className="text-muted-foreground">Statut</span>
                  <Badge variant={detail.status === "active" ? "default" : "destructive"} className="mt-1">
                    {detail.status === "active" ? "Actif" : "Suspendu"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
