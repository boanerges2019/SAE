
import { PlanActionCte } from 'app/core/plan-action/constantes/plan-action.constantes';

export const LABELS  = (() => {
  let result = {};

  // ETATS
  result["etats"] = {};
  result["etats"][PlanActionCte.ETATS.EN_COURS] = "En Cours";
  result["etats"][PlanActionCte.ETATS.SUCCES]   = "Succès";
  result["etats"][PlanActionCte.ETATS.REFUSE]   = "Refusé";
  result["etats"][PlanActionCte.ETATS.SUSPENDU] = "Suspendue";
  result["etats"][PlanActionCte.ETATS.ATTENTE]  = "En Attente";
  result["etats"][PlanActionCte.ETATS.ECHEC]    = "Echec";
  result["etats"][""] = "En Attente";
  return result;
})();
