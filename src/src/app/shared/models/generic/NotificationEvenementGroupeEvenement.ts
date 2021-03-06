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
 * une notification d'événement d'un groupe d'evt(utilisé par la websocket)
 */
export interface NotificationEvenementGroupeEvenement {
    /**
     * type de la notification (INSERTED,REMOVED)
     */
    typeNotification?: NotificationEvenementGroupeEvenement.TypeNotificationEnum;

    /**
     * code info du groupe
     */
    codeGroupe?: string;

    identifiantEvenement?: number;

}
export namespace NotificationEvenementGroupeEvenement {
    export enum TypeNotificationEnum {
        INSERTED = <any> 'INSERTED',
        REMOVED = <any> 'REMOVED'
    }
}
