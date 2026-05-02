import { motion } from "framer-motion";
import {
  Bike, Users, Calendar, CreditCard, TrendingUp, MapPin, Activity,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from "recharts";

const stats = [
  { icon: Bike, label: "Véhicules totaux", value: "156", change: "+12", up: true, desc: "ce mois", color: "text-primary" },
  { icon: Activity, label: "Véhicules disponibles", value: "98", change: "+8", up: true, desc: "actuellement", color: "text-primary" },
  { icon: Calendar, label: "Locations actives", value: "78", change: "+5", up: true, desc: "en cours", color: "text-chart-2" },
  { icon: Users, label: "Utilisateurs", value: "2,430", change: "+89", up: true, desc: "inscrits", color: "text-chart-3" },
  { icon: CreditCard, label: "Revenus du mois", value: "850K DA", change: "+15%", up: true, desc: "vs mois dernier", color: "text-chart-4" },
  { icon: TrendingUp, label: "Taux d'utilisation", value: "72%", change: "-3%", up: false, desc: "cette semaine", color: "text-chart-5" },
];

const revenueData = [
  { month: "Jan", revenue: 85000, locations: 120 },
  { month: "Fév", revenue: 102000, locations: 150 },
  { month: "Mar", revenue: 140000, locations: 200 },
  { month: "Avr", revenue: 125000, locations: 180 },
  { month: "Mai", revenue: 175000, locations: 250 },
  { month: "Jun", revenue: 210000, locations: 300 },
];

const vehicleTypeData = [
  { name: "Vélo électrique", value: 45 },
  { name: "Vélo classique", value: 32 },
  { name: "Scooter", value: 23 },
];

const COLORS = ["hsl(var(--vehicle-electric))", "hsl(var(--vehicle-classic))", "hsl(var(--vehicle-scooter))"];

const vehicleStatusData = [
  { status: "Disponible", count: 98, color: "bg-primary/20 text-primary" },
  { status: "Loué", count: 45, color: "bg-chart-2/20 text-chart-2" },
  { status: "Maintenance", count: 13, color: "bg-destructive/20 text-destructive" },
];

const recentRentals = [
  { user: "Karim B.", vehicle: "Vélo Urbain Pro", station: "Alger Centre", time: "Il y a 5 min", status: "active", amount: "400 DA" },
  { user: "Sarah M.", vehicle: "Scooter City", station: "Bab El Oued", time: "Il y a 15 min", status: "active", amount: "1,050 DA" },
  { user: "Ahmed K.", vehicle: "E-Bike Sport", station: "Kouba", time: "Il y a 30 min", status: "completed", amount: "280 DA" },
  { user: "Amina R.", vehicle: "Vélo Classic", station: "Hussein Dey", time: "Il y a 1h", status: "completed", amount: "400 DA" },
  { user: "Yacine L.", vehicle: "Scooter Express", station: "El Harrach", time: "Il y a 2h", status: "cancelled", amount: "800 DA" },
];

const topStations = [
  { name: "Alger Centre", vehicles: 25, available: 18, rentals: 450 },
  { name: "Bab El Oued", vehicles: 20, available: 12, rentals: 320 },
  { name: "Kouba", vehicles: 18, available: 10, rentals: 280 },
  { name: "Hussein Dey", vehicles: 15, available: 8, rentals: 200 },
  { name: "El Harrach", vehicles: 12, available: 7, rentals: 180 },
];

const dailyRevenueData = [
  { day: "Lun", revenue: 32000 },
  { day: "Mar", revenue: 28000 },
  { day: "Mer", revenue: 35000 },
  { day: "Jeu", revenue: 42000 },
  { day: "Ven", revenue: 38000 },
  { day: "Sam", revenue: 55000 },
  { day: "Dim", revenue: 48000 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de la plateforme GreenWheels.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-display font-bold mt-1">{s.value}</p>
                    <p className={`text-xs flex items-center gap-1 mt-1 ${s.up ? "text-primary" : "text-destructive"}`}>
                      {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {s.change} <span className="text-muted-foreground">{s.desc}</span>
                    </p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center ${s.color}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Revenus mensuels</CardTitle>
              <CardDescription>Évolution des revenus sur 6 mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                    formatter={(value: number) => [`${value.toLocaleString()} DA`, "Revenus"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Revenue */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle>Revenus cette semaine</CardTitle>
              <CardDescription>Revenus quotidiens en DA</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                    formatter={(value: number) => [`${value.toLocaleString()} DA`, "Revenus"]}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Vehicle Status + Type Distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Vehicle Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>État des véhicules</CardTitle>
              <CardDescription>Répartition par statut</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicleStatusData.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${item.color}`}>
                      {item.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{item.count}</span>
                    <span className="text-sm text-muted-foreground ml-1">véhicules</span>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total flotte</span>
                  <span className="font-bold">156 véhicules</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-muted overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: "62.8%" }} />
                  <div className="bg-chart-2 h-full" style={{ width: "28.8%" }} />
                  <div className="bg-destructive h-full" style={{ width: "8.4%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vehicle Type Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="h-full">
              <CardHeader>
                <CardTitle>Types de véhicules</CardTitle>
                <CardDescription>Distribution de la flotte</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    dataKey="value"
                    startAngle={0}
                    endAngle={360}
                    paddingAngle={0}
                  >
                    {vehicleTypeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-2 max-w-48 mx-auto">
                {vehicleTypeData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Stations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Stations</CardTitle>
              <CardDescription>Les plus actives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topStations.map((station, i) => (
                <div key={station.name} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-5">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{station.name}</span>
                      <span className="text-xs text-muted-foreground">{station.rentals} loc.</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(station.available / station.vehicles) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-primary font-medium">{station.available}/{station.vehicles}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Rentals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <Card>
          <CardHeader>
            <CardTitle>Locations récentes</CardTitle>
            <CardDescription>Dernières activités de location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRentals.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      r.status === "active" ? "bg-primary/10" : r.status === "completed" ? "bg-muted" : "bg-destructive/10"
                    }`}>
                      {r.status === "active" ? <Clock className="h-4 w-4 text-primary" /> :
                       r.status === "completed" ? <CheckCircle className="h-4 w-4 text-muted-foreground" /> :
                       <XCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{r.user}</span>
                        <span className="text-muted-foreground text-sm">— {r.vehicle}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {r.station} · {r.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{r.amount}</span>
                    <div>
                      <Badge variant={
                        r.status === "active" ? "default" :
                        r.status === "completed" ? "secondary" : "destructive"
                      } className="text-xs">
                        {r.status === "active" ? "En cours" : r.status === "completed" ? "Terminée" : "Annulée"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
