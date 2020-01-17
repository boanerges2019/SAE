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
 * Objet de type variable (attribut/parametre/variable)
 */
export interface Variable extends models.Valeur {
    /**
     * le codeInfo de l'objet proprietaire de la variable
     */
    codeInfoObjetProprietaire?: string;

    /**
     * la valeur précédente de la variable
     */
    valeurPrecedente?: string;

    /**
     * code de la valeur précédente de la variable
     */
    codeValeurPrecedente?: string;

    /**
     * horodate de dernière modification de la variable
     */
    horodateDerniereModification?: Date;

}
