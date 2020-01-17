export class AnnuaireCte {

    public static CODE_RACINE_PAR_DEFAUT = 'SANS_RACINE';
    public static CODE_MODELE_RACINE = 'RACINE';
    public static CODE_ORGANISATION_PAR_DEFAUT = 'SANS_ORGANISATION';
    public static CODE_MODELE_ORGANISATION = 'ORGANISATION';
    public static PRIMITIVE_APPELER_RESSOURCE = 'ACT_APPELER_DESTINATAIRE';
    public static PRIMITIVE_APPELER_RESSOURCE_PARAM_RESSOURCE   = 'ACT_APPELER_DESTINATAIRE.1';
    public static PRIMITIVE_APPELER_RESSOURCE_PARAM_TYPE_NUMERO = 'ACT_APPELER_DESTINATAIRE.2';

    public static EVENT_NAME = {
        fireRessourceSelectionnee: "fireRessourceSelectionnee",
        fireCodeRessourceSelectionnee: "fireCodeRessourceSelectionnee"
    }

    public static ATTRIBUTS_RESSOURCES = {
        TEL_TRA1: 'CONTACT.NUM_TEL_TRA_1',
        TEL_TRA2: 'CONTACT.NUM_TEL_TRA_2',
        TEL_TRA3: 'CONTACT.NUM_TEL_TRA_3',
        TEL_POR1: 'CONTACT.NUM_TEL_POR_1',
        TEL_POR2: 'CONTACT.NUM_TEL_POR_2',
        TEL_POR3: 'CONTACT.NUM_TEL_POR_3',
        TEL_DOM1: 'PERSONNE_PHYSIQUE.NUM_TEL_DOM_1',
        TEL_DOM2: 'PERSONNE_PHYSIQUE.NUM_TEL_DOM_2',
        NUM_TETRA: 'CONTACT.NUM_TEL_TETRA',
        PRENOM: 'PERSONNE_PHYSIQUE.PRENOM',
        MAIL: 'CONTACT.ADR_MAIL'
    }

}
