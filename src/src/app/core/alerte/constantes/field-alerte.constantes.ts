import { UserCte } from 'app/shared/services/constantes/user.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

export class FieldAlerteCte {

  public static FIELD = {
    valeur: 'valeur',
    codeInfoModele: 'codeInfoModele',

    type: 'codeModele',
    etat: 'codeEtat',
    level: 'level',
    operateur: 'operateur',
  };


  private static getDroits(){
    let result = {};
    let droitDestionDeBase = [ UserCte.DROIT.gestionDesEvenementsPrevus, UserCte.DROIT.gestionDesEvenementEtPlanActions];
    result[FieldAlerteCte.FIELD.type] = droitDestionDeBase;
    result[FieldAlerteCte.FIELD.etat] = droitDestionDeBase;

    return result;
  };

  public static DROIT = FieldAlerteCte.getDroits();



  private static getContextes(){
    let result = {};
    result[FieldAlerteCte.FIELD.type] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDDATE_TYPE_EVENEMENT];
    result[FieldAlerteCte.FIELD.etat] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,  CtxCte.CTX.UPDATE_ETAT_EVENEMENT];


    return result;
  };
  public static CTX = FieldAlerteCte.getContextes();

}
