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
 * résumé d'un événement
 */
export interface ResumeEvenement extends models.ObjetAttribut {
    /**
     * code de l'état de l'événement
     */
    codeEtat?: string;

    /**
     * horodate de début format 2012-04-23T18:25:43.511Z
     */
    horodateDebut?: Date;

    /**
     * horodate de début prévue format 2012-04-23T18:25:43.511Z
     */
    horodateDebutPrevue?: Date;

    /**
     * horodate de fin format 2012-04-23T18:25:43.511Z
     */
    horodateFin?: Date;

    /**
     * horodate de fin prévue format 2012-04-23T18:25:43.511Z
     */
    horodateFinPrevue?: Date;

    /**
     * nom du localisant
     */
    nomLocalisant?: string;

    /**
     * version de l'evt
     */
    versionEvenement?: number;

    /**
     * indicateur d'événement simulé
     */
    simule?: boolean;

}
