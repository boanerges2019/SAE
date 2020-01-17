export class Champs {
    colonne: string;
    label: string;
    filtre: boolean;
    date: boolean;
    width: number;


}
export class HistoCourtTermeDefinition {
    codeInfo: string; 
    label: string;
    champs: Array<Champs>;
    url: string;
    urlFiltre: string


    constructor(
        code: string,
        label: string,
        champs: Array<Champs>,
        url: string,
        urlFiltre: string
    ){
        this.codeInfo = code;
        this.label= label;
        this.champs = champs;
        this.url = url;
        this.urlFiltre = urlFiltre;
    }

    static ListeHistoCourtTerme = {
        EVENEMENTS: new HistoCourtTermeDefinition(
            'EVENEMENTS',
            'Evénements',
            [
             {colonne: 'IDENTIFIANT', label: 'Identifiant', filtre: true, date: false, width: 10},
             {colonne: 'VERSION', label: 'Version', filtre: false, date: false, width: 5},
             {colonne: 'TYPE', label: 'Type', filtre: true, date: false, width: 15},
             {colonne: 'ETAT', label: 'Etat', filtre: true, date: false, width: 10},
             {colonne: 'LOCALISATION', label: 'Localisation', filtre: true, date: false, width: 20},
             {colonne: 'HORODATE_DEBUT', label: 'Horodate début', filtre: true, date: true, width: 10}, /* Attention 10*2 car filtre sur periode */
             {colonne: 'HORODATE_FIN', label: 'Horodate fin', filtre: false, date: true, width: 10},
             {colonne: 'HORODATE_CLOTURE', label: 'Horodate clôture', filtre: false, date: true, width: 10}
             ],            
            'res/historique_evenement',
            'res/historique_evenement_filtre'
        ),
        BALISAGES: new HistoCourtTermeDefinition(
            'BALISAGES',
            'Balisages',
            [
                {colonne: 'IDENTIFIANT', label: 'Identifiant', filtre: true, date: false, width: 10},
                {colonne: 'VERSION', label: 'Version', filtre: false, date: false, width: 5},
                {colonne: 'TYPE', label: 'Type', filtre: true, date: false, width: 15},
                {colonne: 'ETAT', label: 'Etat', filtre: true, date: false, width: 10},
                {colonne: 'LOCALISATION', label: 'Localisation', filtre: true, date: false, width: 20},
                {colonne: 'HORODATE_DEBUT', label: 'Horodate début', filtre: true, date: true, width: 10},
                {colonne: 'HORODATE_FIN', label: 'Horodate fin', filtre: false, date: true, width: 10},
                {colonne: 'HORODATE_CLOTURE', label: 'Horodate clôture', filtre: false, date: true, width: 10}
                ],
                'res/historique_balisage',
                'res/historique_balisage_filtre'
        ),        
        ALERTES: new HistoCourtTermeDefinition(
            'ALERTES',
            'Alertes',
            [
                {colonne: 'IDENTIFIANT', label: 'Identifiant', filtre: true, date: false, width: 10},
                {colonne: 'TYPE', label: 'Type', filtre: true, date: false, width: 10},
                {colonne: 'ETAT', label: 'Etat', filtre: true, date: false, width: 7},
                {colonne: 'LOCALISATION', label: 'Localisation', filtre: true, date: false, width: 15},
                {colonne: 'HORODATE_APPARITION', label: 'Horodate apparition', filtre: true, date: true, width: 10}, //20
                {colonne: 'HORODATE', label: 'Horodate modification', filtre: false, date: true, width: 10},
                {colonne: 'HORODATE_CLOTURE', label: 'Horodate cloture', filtre: false, date: true, width: 10},                
                {colonne: 'OPERATEUR', label: 'Opérateur', filtre: false, date: false, width: 7},
                {colonne: 'EVENEMENT', label: 'Evénement', filtre: true, date: false, width: 8}
                ],
                'res/historique_alerte',
                'res/historique_alerte_filtre'
        ),        
        APPELS: new HistoCourtTermeDefinition(
            'APPELS',
            'Appels',
            [
                {colonne: 'ID_APPEL_FRONTAL', label: 'Id frontal', filtre: true, date: false, width: 7},
                {colonne: 'TYPE', label: 'Type', filtre: true, date: false, width: 10},
                {colonne: 'MEDIA', label: 'Média', filtre: true, date: false, width: 8},
                {colonne: 'NOM_EMETTEUR', label: 'Emetteur', filtre: true, date: false, width: 20},
                {colonne: 'EMETTEUR', label: 'N° Emetteur', filtre: true, date: false, width: 10},
                {colonne: 'NOM_RESSOURCE_DESTINATAIRE', label: 'Destinataire', filtre: true, date: false, width: 15},
                {colonne: 'STATUT', label: 'Statut', filtre: true, date: false, width: 10},
                {colonne: 'HORODATE', label: 'Horodate', filtre: true, date: true, width: 10}
            ],
            'res/historique_appel',
            'res/historique_appel_filtre'
        ),
        ENVOIS: new HistoCourtTermeDefinition(
            'ENVOIS',
            'Envois',
            [
                {colonne: 'TYPE', label: 'Type', filtre: true, date: false, width: 20},
                {colonne: 'DESTINATAIRE', label: 'Destinataire', filtre: true, date: false, width: 20},
                {colonne: 'MEDIA', label: 'Média', filtre: true, date: false, width: 10},
                {colonne: 'STATUT', label: 'Statut', filtre: true, date: false, width: 10},
                {colonne: 'HORODATE', label: 'Horodate envoi', filtre: true, date: true, width: 10},               
                {colonne: 'EVENEMENT', label: 'Evénement', filtre: true, date: false, width: 10}
            ],
            'res/historique_document_envoye',
            'res/historique_document_envoye_filtre'
        )        
    }



    static getHistoCourtTermeDefinition(codeHisto: string): HistoCourtTermeDefinition {
        if(codeHisto){
            return this.ListeHistoCourtTerme[codeHisto];
        }
        return undefined;
    }


}




