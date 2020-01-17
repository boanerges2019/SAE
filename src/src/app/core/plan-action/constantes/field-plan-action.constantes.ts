import { UserCte } from 'app/shared/services/constantes/user.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

export class FieldPlanActionCte {

  public static FIELD = {
    valeur: 'valeur',
    codeInfoModele: 'codeInfoModele',

    type: 'codeModele',
    etat: 'codeEtat',

    listeActions: 'listeAction', // Liste de toutes  les actions unitaires.
    itemAction: 'itemAction', // une action unitaire
    nomAction: 'nomAction',
    categorie: 'categorie',
    primitive: 'primitive',
    parametre: 'parametre',
  };


  private static getDroits(){
    let result = {};
    let droitDestionDeBase = [ UserCte.DROIT.gestionDesEvenementsPrevus, UserCte.DROIT.gestionDesEvenementEtPlanActions];


    result[FieldPlanActionCte.FIELD.type] = droitDestionDeBase;
    result[FieldPlanActionCte.FIELD.etat] = droitDestionDeBase;

    return result;
  };

  public static DROIT = FieldPlanActionCte.getDroits();



  private static getContextes(){
    let result = {};
    result[FieldPlanActionCte.FIELD.type] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDDATE_TYPE_EVENEMENT];
    result[FieldPlanActionCte.FIELD.etat] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDATE_ETAT_EVENEMENT];

    result[FieldPlanActionCte.FIELD.nomAction] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDATE_ETAT_EVENEMENT];
    result[FieldPlanActionCte.FIELD.categorie] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDATE_ETAT_EVENEMENT];
    result[FieldPlanActionCte.FIELD.primitive] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDATE_ETAT_EVENEMENT];
    result[FieldPlanActionCte.FIELD.parametre] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDATE_ETAT_EVENEMENT];


    return result;
  };
  public static CTX = FieldPlanActionCte.getContextes();

}
