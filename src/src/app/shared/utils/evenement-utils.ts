import { EvenementCte } from '../../../app/core/evenement/constantes/evenement.constantes';
import { FieldEvenementCte } from '../../../app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from '../../../app/shared/models/generic/Evenement';
import { Pr } from '../../../app/shared/models/generic/Pr';

export const EvenementUtils = {
  /**
  * @return la classe css à appliquer selon le paramètre en entrée.
  * @param statut event
  */
  getCssClasses: function getCssClasses(item: string){
    switch (item){
      case EvenementCte.ETATS_EVENEMENT.enCours : return 'en-cours';
      case EvenementCte.ETATS_EVENEMENT.signale : return 'signale';
      case EvenementCte.ETATS_EVENEMENT.prevu : return 'signale';
      case EvenementCte.ETATS_EVENEMENT.termine : return 'termine';
      default: break;
    }
  },

  /**
  * Détermine si la liste des sections est appelable.
  * @param localisant le localisant.
  * @return true si callable, false sinon.
  */
  isSectionCallable: function isSectionCallable(localisant: any, evenement: Evenement): boolean{
    let base: boolean = !!localisant[FieldEvenementCte.FIELD.typeLocalisant] &&
                !!evenement.localisant.prDebut && !!evenement.localisant.prDebut.codeAxe
                !!evenement.localisant[FieldEvenementCte.FIELD.sens];

    switch(localisant[FieldEvenementCte.FIELD.typeLocalisant]){
      case  EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL:
      case  EvenementCte.INPUT.TYPES_LOCALISANT_LIEU:
        return   base && !!evenement.localisant.prDebut &&
        typeof evenement.localisant.prDebut.abscisse === "number" &&
        typeof evenement.localisant.prDebut.numero === "number" ;
      case  EvenementCte.INPUT.TYPES_LOCALISANT_ETENDU:
        let res =  base && !!evenement.localisant.prDebut &&  !!evenement.localisant.prFin &&
        typeof evenement.localisant.prDebut.abscisse === "number" &&
        typeof evenement.localisant.prDebut.numero === "number" &&
        typeof evenement.localisant.prFin.abscisse === "number" &&
        typeof evenement.localisant.prFin.numero === "number" ;

        return res;
      default: return false;
    }
  },

  /**
  * @param pr
  * @return un objet string à partir d'un pr.
  */
  prToString: function prToString(pr: Pr): string {
    if (!pr || typeof pr.numero !== "number"|| typeof pr.abscisse !== "number") return "";
    return !!pr ? `${pr.numero}+${pr.abscisse}` : '';
  },

  /**
  * @param prString
  * @return un objet pr à partir d'une chaine.
  */
  stringToPr: function stringToPr(prString: string): any {
    let result: { [key: string]: any } = {};
    if (!prString) return null;
    let prs = prString.split('+');
    result.numero = !!prs && prs.length === 2 ? parseInt(prs[0]) : undefined;
    result.abscisse = !!prs && prs.length === 2 ? parseInt(prs[1]) : undefined;
    // if (result.abscisse < 10) result.abscisse *= 100;
    // else if (result.abscisse < 100) result.abscisse *= 10;
    return result;
  },
  /**
  * Renvoie true si sens inverse
  * @param sens
  * @return renvoie true si sens inverse
  */
  isSensInverse: function isSensInverse(sens: string): boolean {
    if (sens === EvenementCte.INPUT.SENS_DECROISSANT) return true;
    else return false;
  },

  /**
  * Teste si le pr existe.
  * @param pr
  * @return renvoie true si pr  existe
  */
  existPr: function existPr(pr: Pr): boolean {
    return !!pr && typeof pr.numero === "number" && typeof pr.abscisse === "number";
  }

}
