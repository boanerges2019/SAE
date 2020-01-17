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
 * un pr
 */
export interface PrOriente extends models.Objet {
    /**
     * code de l'axe du pr
     */
    codeAxe?: string;

    /**
     * sens du pr
     */
    sens?: string;    

    /**
     * numéro du pr
     */
    numero?: number;

    /**
     * abscisse du pr
     */
    abscisse?: number;

}
