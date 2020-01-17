import { Objet } from "../models/generic/Objet";



export const ModeleValeur = {

  


  /**
  * Valorise l'attribut passé en paramètre.
  * @param targetAttribut
  * @param value
  */
  setBooleanValue: function setBooleanValue(targetAttribut: any, value: boolean){
    if (value){
      targetAttribut['nom'] = "Oui";
      targetAttribut['description'] = "Oui";
      targetAttribut['valeur'] = "1";
      targetAttribut['codeValeur'] = "BOOLEEN_ON.OUI";
    } else {
      targetAttribut['nom'] = "Non";
      targetAttribut['description'] = "Non";
      targetAttribut['valeur'] = "0";
      targetAttribut['codeValeur'] = "BOOLEEN_ON.NON";
    }
  },

  /**
  * Valorise l'attribut passé en paramètre.
  * @param targetAttribut
  * @param enumObject
  * @param enumKey
  */
  setEnumValue: function setEnumValue(targetAttribut: any, enumObject: any, enumKey: string){
    if (enumObject){
      targetAttribut['nom'] = enumObject[enumKey].nom;
      targetAttribut['description'] = enumObject[enumKey].description;
      targetAttribut['codeValeur'] = enumObject[enumKey].codeInfo;
      targetAttribut['valeur'] = enumObject[enumKey].valeur;
    }
  },

  /**
  * Valorise l'attribut passé en paramètre.
  * @param targetAttribut
  * @param value
  */
  setValue: function setValue(targetAttribut: any, value: string){
    targetAttribut['nom'] = `${value}`;
    targetAttribut['description'] = `${value}`;
    targetAttribut['codeValeur'] = `${value}`;
    targetAttribut['valeur'] = `${value}`;
  },


  /**
  * Valorise l'attribut passé en paramètre.
  * @param targetAttribut
  * @param value
  */
 setObjetValue: function setObjetValue(targetAttribut: any, value: Objet){
  targetAttribut['nom'] = `${value.nom}`;
  targetAttribut['description'] = `${value.description}`;
  targetAttribut['codeValeur'] = `${value.codeInfo}`;
  targetAttribut['valeur'] = `${value.identifiant}`;
},




  /**
  * initialise les attributs.
  * @param fields les champs du model à initialiser
  * @param model le model
  */
  initModel: function initModel(fields: any, model: any): any{
    fields.forEach( f => {
        model[f] = {
          valeur: undefined,
          codeInfoModele: f
        };
    });
    return model;
  },

  /**
  * Vérifie si le model est vide.
  * param model
  * @return true si model est vide false sinon
  */
  isModelNotEmpty: function isModelNotEmpty(model: any): boolean {
    let result = false;
    if (!model) return result;
    for(const field in model){
      if (!!model[field] && !!model[field]['valeur']){
        return true;
      }
    }
    return result;
  },

  /**
  * Retourne la liste des sens qui sont pris en compte.
  * @param sensList liste des sens.
  * @return Retourne la liste des sens qui sont pris en compte.
  */
  getSens: function getSens(sensList: any): string[] {
    return sensList.filter(sens => sens.codeInfo !== "SENS.DEUX_SENS").sort((a: any, b: any) => a.valeur - b.valeur);
  },

  /**
  * Retourne la liste des lieux en fonction d'un type de lieu.
  * @param typeLieu type de lieu.
  * @param lieux collection de lieux.
  * @return Retourne la liste des lieux en fonction d'un type de lieu.
  */
  getLieu: function getLieu(typeLieu: string, lieux: any[] ): string[] {
    return lieux.filter(lieu => lieu.codeModele === typeLieu);
  }

}
