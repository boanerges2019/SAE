/**
 * Opérations liées aux stratégies
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
 * une notification de màj macro commande
 */
export interface NotificationMacroCommande {
    /**
     * CREATED,UPDATED,DELETED
     */
    typeNotification?: NotificationMacroCommande.TypeNotificationEnum;

    macro?: models.ResumeMacroCommande;

}
export namespace NotificationMacroCommande {
    export enum TypeNotificationEnum {
        CREATED = <any> 'CREATED',
        UPDATED = <any> 'UPDATED',
        DELETED = <any> 'DELETED'
    }
}
