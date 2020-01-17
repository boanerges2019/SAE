import { TabDefinition } from "../../../shared/components/abstract-tab/tab-definition";
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { UserCte } from 'app/shared/services/constantes/user.constantes';

export class AstreintesCte {


    public static RIGHT_TABS: { [key: string]: TabDefinition } = {
        TAB_INFO: new TabDefinition(1,'TAB_INFO','Informations','Informations sur l\'intervenant','setActiveTab("TAB_INFO")'),
        TAB_DIFFUSION: new TabDefinition(2,'TAB_DIFFUSION','Diffusions du message','Diffusions du message vocal de test','setActiveTab("TAB_DIFFUSION")')
    }

    public static FIELDS = {
        forcer:"forcer",
        appeller:"appeller",
        calendrier:"calendrier",
        dateDebut:"dateDebut",
        heureDebut:"heureDebut",
        valider:"valider",
        annuler:"annuler"
    }

    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDesAstreintes];

        // par défaut tous les fields ont les droits de base
        for (const key in AstreintesCte.FIELDS) {
            let value = AstreintesCte.FIELDS[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.ASTREINTES];
        // par défaut tous les fields ont les contexte de base
        for (const key in AstreintesCte.FIELDS) {
            let value = AstreintesCte.FIELDS[key];
            result[value] = contexteDeBase;
        }
        result[AstreintesCte.FIELDS["forcer"]] = [CtxCte.CTX.ASTREINTES];
        result[AstreintesCte.FIELDS["appeller"]] = [CtxCte.CTX.ASTREINTES];
        return result;
    })();

    /**
     * Déclaration des champs éditables selon l'etat.
     */
    public static ETAT = (() => {
        let result = {};
        return result;
    })();
}
