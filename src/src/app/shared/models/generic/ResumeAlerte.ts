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
 * résumé d'une alerte
 */
export interface ResumeAlerte extends models.ObjetAttribut {
    /**
     * code de l'état de l'alerte
     */
    codeEtat?: string;

    /**
     * nom du localisant
     */
    nomLocalisant?: string;

    idEvenementGenere?: number;

    idEvenementAttache?: number;

    commentaire?: string;

}
