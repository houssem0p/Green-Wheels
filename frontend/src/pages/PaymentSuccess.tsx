import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- Interfaces ---
interface Plan {
  id: string | number;
  title: string;
  price: string | number;
  price_display: string;
}

interface PaymentInfo {
  paid_at?: string | number | Date;
  id?: string | number;
  [key: string]: any;
}

interface LocationState {
  plan?: Plan;
  reservation?: {
    vehicle_name: string;
    duration_hours: number;
    total_price: number;
    start_date: string;
    end_date: string;
  };
  payment?: PaymentInfo;
}

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Cast location state to our interface
  const state = location.state as LocationState;
  const plan = state?.plan;
  const reservation = state?.reservation;
  const payment = state?.payment;

  useEffect(() => {
    // If someone tries to access this page directly without payment info
    if (!plan && !reservation) {
      navigate("/vehicles");
    }
  }, [plan, reservation, navigate]);

  // Safety return to avoid rendering while redirecting
  if (!plan && !reservation) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Paiement réussi !
        </h1>
        
        <p className="text-slate-500 mb-6">
          {plan ? (
            <>Merci pour votre achat. Votre abonnement <span className="font-semibold text-slate-700">{plan.title}</span> est maintenant actif.</>
          ) : (
            <>Merci pour votre réservation. Votre véhicule <span className="font-semibold text-slate-700">{reservation?.vehicle_name}</span> est réservé.</>
          )}
        </p>

        {/* Payment Details */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-slate-600 mb-2 font-semibold">Détails du paiement :</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{plan ? "Plan" : "Véhicule"} :</span>
              <span className="font-medium text-slate-900">{plan ? plan.title : reservation?.vehicle_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Montant :</span>
              <span className="font-medium text-emerald-600">{plan ? plan.price_display : `${reservation?.total_price} DA`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date :</span>
              <span className="font-medium text-slate-900">
                {payment?.paid_at 
                  ? new Date(payment.paid_at).toLocaleDateString() 
                  : new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Statut :</span>
              <span className="font-medium text-emerald-600">Confirmé</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            Aller au tableau de bord
          </button>
          
          <button
            onClick={() => navigate(plan ? "/abonnements" : "/vehicles")}
            className="w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            {plan ? "Voir d'autres abonnements" : "Voir d'autres véhicules"}
          </button>
        </div>
      </div>
    </div>
  );
}