import { TabDefinition } from "../../../shared/components/abstract-tab/tab-definition";
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { UserCte } from 'app/shared/services/constantes/user.constantes';

export class JournauxHistoCte {

    public static TABS: { [key: string]: TabDefinition } = {
        TAB_JOURNAL_ACTIVITE: new TabDefinition(1,'TAB_JOURNAL_ACTIVITE','Journal d\'activité','Journal d\'activité','setActiveTab("TAB_JOURNAL_ACTIVITE")'),
        TAB_HISTO_COURT_TERME: new TabDefinition(2,'TAB_HISTO_COURT_TERME','Historique court terme','Historique court terme','setActiveTab("TAB_HISTO_COURT_TERME")'),
        TAB_EXTRACTION: new TabDefinition(2,'TAB_EXTRACTION','Extraction de données','Extraction de données','setActiveTab("TAB_EXTRACTION")')
    }

    public static FORMAT = {
        CHOIX:"choix",
        DATE:"dd/MM/yyyy hh24:mi:ss"
    }

    public static TYPE = {
        TYPE_STRING:"String",
        DATE:"date",
        BOOLEAN:"boolean",
        INT:"int",
        LIST:"list"
    }

    public static FIELDS = {
        exporter:"exporter",
        appeller:"extraire",
        requeteChoisi:"requeteChoisi"
    }

    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionExtractionsDonnees];

        // par défaut tous les fields ont les droits de base
        for (const key in JournauxHistoCte.FIELDS) {
            let value = JournauxHistoCte.FIELDS[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.EXTRACTIONS_DONNEES];
        // par défaut tous les fields ont les contexte de base
        for (const key in JournauxHistoCte.FIELDS) {
            let value = JournauxHistoCte.FIELDS[key];
            result[value] = contexteDeBase;
        }
        result[JournauxHistoCte.FIELDS["forcer"]] = [CtxCte.CTX.EXTRACTIONS_DONNEES];
        result[JournauxHistoCte.FIELDS["appeller"]] = [CtxCte.CTX.EXTRACTIONS_DONNEES];
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
