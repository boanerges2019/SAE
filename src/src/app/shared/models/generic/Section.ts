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
 * une Section
 */
export interface Section extends models.ObjetAttribut {
    /**
     * code du sens de la section
     */
    codeSens?: string;

    /**
     * Pr de début de la section
     */
    prDebut?: models.Pr;

    /**
     * Pr de fin de la section
     */
    prFin?: models.Pr;

    voies?: Array<models.Voie>;

}
