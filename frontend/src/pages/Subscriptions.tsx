import { motion } from "framer-motion";
import { Check, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Horaire",
    price: "200",
    period: "heure",
    desc: "Idéal pour les courts trajets",
    features: ["1 heure de location", "Tous véhicules", "Assurance incluse", "Annulation gratuite"],
    popular: false,
  },
  {
    name: "Journalier",
    price: "750",
    period: "jour",
    desc: "Parfait pour une journée d'exploration",
    features: ["24 heures de location", "Tous véhicules", "Assurance incluse", "Annulation gratuite", "Support prioritaire"],
    popular: true,
  },
  {
    name: "Mensuel",
    price: "5 000",
    period: "mois",
    desc: "Pour les trajets quotidiens",
    features: ["Accès illimité", "Tous véhicules", "Assurance premium", "Annulation gratuite", "Support 24/7", "Tarifs réduits"],
    popular: false,
  },
  {
    name: "Annuel",
    price: "40 000",
    period: "an",
    desc: "L'offre la plus avantageuse",
    features: ["Accès illimité", "Tous véhicules", "Assurance premium", "Annulation gratuite", "Support VIP", "Tarifs réduits", "2 mois gratuits"],
    popular: false,
  },
];

export default function Subscriptions() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Nos Abonnements</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins de mobilité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} className="flex">
              <Card className={`flex flex-col w-full relative ${p.popular ? "border-primary shadow-lg shadow-primary/20" : ""}`}>
                {p.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                    <Star className="h-3 w-3" /> Populaire
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="font-display text-xl">{p.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-display font-bold text-primary">{p.price}</span>
                    <span className="text-muted-foreground ml-1">DA/{p.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={p.popular ? "default" : "outline"}>
                    Choisir ce plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
