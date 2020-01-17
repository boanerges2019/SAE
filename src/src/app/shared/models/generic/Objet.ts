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
 * Objet root des objet agora
 */
export interface Objet {
    /**
     * identifiant de l'objet
     */
    identifiant?: number;

    /**
     * code informatique de l'objet
     */
    codeInfo?: string;

    /**
     * nom de l'objet (nom court)
     */
    nom?: string;

    /**
     * description de l'objet (nom long)
     */
    description?: string;

}
