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
 * Objet de type valeur (attribut/parametre/variable)
 */
export interface Valeur extends models.Objet {
    /**
     * code du modele de valeur
     */
    codeModele?: string;

    /**
     * la valeur
     */
    valeur?: string;

    /**
     * code de la valeur
     */
    codeValeur?: string;

}
