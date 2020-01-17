/**
 * Données liées aux macro commandes
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
 * Planification
 */
export interface Planification extends models.Objet {
    /**
     * horodate de la prochaine exécution format 2012-04-23T18:25:43.511Z
     */
    horodateProchaineExecutionDebut?: Date;

    /**
     * horodate de la prochaine exécution format 2012-04-23T18:25:43.511Z
     */
    horodateProchaineExecutionFin?: Date;

    /**
     * indique si la planification est active ce jour
     */
    lundi?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    mardi?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    mercredi?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    jeudi?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    vendredi?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    samedi?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    dimanche?: boolean;

    /**
     * indique si la planification est active ce jour
     */
    jourFerie?: boolean;

    /**
     * date de début de la planification format 2012-04-23T18:25:43.511Z
     */
    dateDebut?: Date;

    /**
     * date de fin de la planification format 2012-04-23T18:25:43.511Z
     */
    dateFin?: Date;

    /**
     * heure de déclenchement de l'action de début de la planification format HH:mm
     */
    heureDeDebut?: string;

    /**
     * heure de déclenchement de l'action de fin de la planification format HH:mm
     */
    heureDeFin?: string;

    /**
     * indique si le début de la planification nécessite une confirmation
     */
    demandeConfirmationDebut?: boolean;

    /**
     * indique si le début de la planification nécessite une confirmation
     */
    demandeConfirmationFin?: boolean;

}
