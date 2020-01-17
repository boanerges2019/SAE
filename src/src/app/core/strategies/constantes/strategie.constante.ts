import * as _ from 'underscore';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

/**
 * Entité de représentation les constantes des stratégies.
 */
export class StrategieCte {

    public static MODE_NEUTRE: string = "PMV_MODE_AFFICHAGE.NEUTRE";
    public static MODE_EXTINCTION:string = "PMV_MODE_AFFICHAGE.EXTINCTION";
    public static MODE_AFFICHAGE: string = "PMV_MODE_AFFICHAGE.AFFICHAGE";

    public static MESSAGE_SIMPLE: string = "PMV_TYPE_MESSAGE.SIMPLE";
    public static MESSAGE_CLIGNOTANT: string = "PMV_TYPE_MESSAGE.CLIGNOTANT";
    public static MESSAGE_ALTERNAT: string = "PMV_TYPE_MESSAGE.ALTERNAT";

    public static FLASH_EXTINCTION: string = "PMV_ETAT_FLASH.EXTINCTION";
    public static FLASH_ALLUMAGE: string = "PMV_ETAT_FLASH.ALLUMAGE";

    public static LUMINOSITE_AUTO: string = "PMV_LUMINOSITE.AUTO";
    public static CODE_MODELE_PICTO: string = "PMV_ETAT_PICTO";
    public static CODE_MODELE_LUMINOSITE: string = "PMV_LUMINOSITE";
    public static PMV_ETAT_PICTO_VIDE: string = "PMV_ETAT_PICTO.VIDE";
    public static STRATEGIE_ACTIVE: string = "ETAT_STRATEGIE.ACTIVE";
    public static STRATEGIE_INACTIVE: string = "ETAT_STRATEGIE.INACTIVE";
    public static STRATEGIE_PERMANENT: string = "ETAT_STRATEGIE.PERMANENT";

}
