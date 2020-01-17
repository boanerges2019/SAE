import { Objet } from "../../models/generic/Objet";

export class TabDefinition implements Objet{


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

    /**
     * l'action
     */
    action: string;


    constructor(
        id: number,
        code: string,
        nom: string,
        description: string,
        action: string
    ){
        this.identifiant = id;
        this.codeInfo = code;
        this.nom = nom;
        this.description = description;
        this.action = action;
    }

}