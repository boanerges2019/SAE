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
 * une cellule d'astreinte
 */
export interface CelluleAstreinte extends models.Objet {
    /**
     * horodate de création format 2012-04-23T18:25:43.511Z
     */
    horodateDebut?: Date;

    /**
     * horodate de création format 2012-04-23T18:25:43.511Z
     */
    horodateFin?: Date;

    /**
     * horodate de création format 2012-04-23T18:25:43.511Z
     */
    horodateDebutCorrigee?: Date;

    /**
     * horodate de création format 2012-04-23T18:25:43.511Z
     */
    horodateFinCorrigee?: Date;

    /**
     * code de la ressource d'astreinte
     */
    codeRessource?: string;

    /**
     * nom de la ressource d'astreinte
     */
    nomRessource?: string;

    /**
     * numero d'appel de la ressource
     */
    numeroPrivilegie?: string;    

    /**
     * code du groupe d'astreinte
     */
    codeAstreinte?: string;

    /**
     * code du modèle de l'astreinte
     */
    codeModeleAstreinte?: string;

    /**
     * indique si c'est une cellule d'astreinte forcée
     */
    forcee?: boolean;

}