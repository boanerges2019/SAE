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
 * Objet avec attribut
 */
export interface ObjetAttribut extends models.Objet {
    /**
     * modele d'objet attribut
     */
    codeModele?: string;

    /**
     * Map codeInfo modele attribut -> attributs
     */
    attributs?: { [key: string]: models.Attribut; };

}
