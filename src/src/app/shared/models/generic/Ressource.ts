/**
 * Données liées aux ressources
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
 * une ressource
 */
export interface Ressource extends models.ObjetAttribut {

    /** 
     * code de l'organisation à laquelle est rattaché la ressource
    */
    codeOrganisation?: string;

    /**
     * liste des codes des profils de la ressources
     */
    listeCodesProfils?: Array<string>;

    /**
     * liste des codes des droits de la ressources
     */
    listeCodesDroits?: Array<string>;

}
