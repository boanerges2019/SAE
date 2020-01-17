/**
 * Données liées aux événements
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

/**
 * un équipement
 */
export interface Commande extends models.Objet {

    /**
     * type de la commande
     */
    typeCommande?: string;

    /**
     * code de l'équipement
     */
    codeEquipement?: string;


    /**
     * Map codeInfo modele variable -> valeur variable
     */
    variables?: { [key: string]: any; };

}