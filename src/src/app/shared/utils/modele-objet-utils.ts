import {ModeleObjetAttribut} from '../../../app/shared/models/generic/ModeleObjetAttribut';

export const ModeleObjetUtils = {

    

    heriteDe(codeModele: string, codeModeleAncetre: string, modeles: Map<string, ModeleObjetAttribut> ): boolean {
        
        let retour: boolean = false;
        let parcourus: Set<string> = new Set();

        let modeleCourant: ModeleObjetAttribut;
        if(modeles.has(codeModele)){
            modeleCourant = modeles.get(codeModele);
        }
        while(modeleCourant && !retour){
            if(parcourus.has(modeleCourant.codeInfo)){
                console.error('cycle détecté dans la chaine d\'héritage des modèles');
                break;
            }
            if(modeleCourant.codeInfo === codeModeleAncetre){
                // Si c'est le modèle recherché, on renvoie true
                retour = true;
            }else if(modeleCourant.codeModeleHerite && modeles.has(modeleCourant.codeModeleHerite)) {
                // On passe au modèle hérité
                parcourus.add(modeleCourant.codeInfo);
                modeleCourant = modeles.get(modeleCourant.codeModeleHerite);
            }else{
                // Si plus de modèle hérité, on sort
                break;
            }
        }
        return retour;
    }



}