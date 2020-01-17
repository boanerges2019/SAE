import * as models from './models';
import { CelluleAstreinte } from './models';
import * as moment from 'moment';

/**
 * une plage d'astreinte
 */
export class PlageHoraireAstreinte  {
    horodateDebut: Date;
    horodateFin: Date;
    posX: number;
    width: number;
    cellules: Array<CelluleAstreinte> = [];


    constructor(hd1: Date, hd2: Date) {
        this.horodateDebut = hd1;
        this.horodateFin = hd2;

        this.horodateDebut.setSeconds(0);
        this.horodateDebut.setMilliseconds(0);
        this.horodateFin.setSeconds(0);
        this.horodateFin.setMilliseconds(0);        

        const jour = 24 * 36000;
        const sod = moment(hd1).startOf('day').toDate().getTime();

        // Initialisation de la position et de la largeur de la plage horaire
        this.posX = (hd1.getTime() - sod ) / jour;
        this.width = (hd2.getTime() - hd1.getTime()) / jour;

    }


    /**
     * renvoie true s'il y a intersection entre la plage horaire et [hd1,hd2]
     * @param hd1
     * @param hd2
     */
    public estDansLaPlage(hd1: Date, hd2: Date): boolean {
        const nomMethode = 'estDansLaPlage';

        let retour = false;
        hd1.setSeconds(0);
        hd1.setMilliseconds(0);
        hd2.setSeconds(0);
        hd2.setMilliseconds(0);
        retour = this.horodateFin > hd1 && this.horodateDebut < hd2;
        
        return retour;
    }



    public addCelluleAstreinte(cell: CelluleAstreinte){
        this.cellules.push(cell);
        //Et on trie au fur et à mesure des insertions
        this.cellules.sort(
            (c1,c2) => {
                let retour = moment(c1.horodateDebut).toDate().getTime() - moment(c2.horodateDebut).toDate().getTime();
                if(retour===0){
                    retour = c1.codeRessource.localeCompare(c2.codeRessource);
                }
                return retour;
            }
        );
    }



}
