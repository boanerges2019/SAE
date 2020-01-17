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
 * ModèleObjet avec attribut
 */
export interface ModeleObjetAttribut extends models.Objet {
    /**
     * Map codeInfo modele -> modele attributs
     */
    modelesAttributs?: { [key: string]: models.ModeleAttribut; };

    /** 
     * le code du modèle d'objet dont hérite ce modèle
    */
    codeModeleHerite?: string;

    /** 
     * indique si ce modèle est virtuel
    */
    virtuel?: boolean;


}
