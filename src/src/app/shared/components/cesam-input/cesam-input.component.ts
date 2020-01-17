import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { ModeleValeur } from '../../../../app/shared/utils/modele-valeur-builder';
import { ModeleEvenementService } from '../../../../app/core/evenement/services/modele-evenement.service';
import { Objet } from '../../models/generic/Objet';

@Component({
  selector: 'cesam-input',
  templateUrl: './cesam-input.component.html',
  styleUrls: ['./cesam-input.component.scss']
})
export class CesamInputComponent implements OnInit {

  @Input() type: string; // type de l'input
  @Input() model:{ [key: string]: any }; // modèle de données
  @Input() fieldName: string; // nom du champ
  @Input() currentCtx: string; // contexte d'appel
  @Input() hideExtraVar: boolean; // si on cache le champ
  @Input() state: string; // état de l'entité
  @Input() rows: number; // nombre de colonne de l'input si textArea
  @Input() maxlength: number; // longuer max de l'input
  @Input() innerHTML: string; // le texte de l'input
  @Input() items: string[]; // les données de l'input si type 'select'
  @Input() enumName: string; // le nom de l'enumeration si type 'select'
  @Input() itemsRequete: { [key: string]: Objet }; // modèle de données
  @Input() step: any; // step pour controller les décimaux
  @Input() disabled: boolean; // pour griser le champ
  checkboxModel: boolean;
  @Output('selectedValue') selectedValue:EventEmitter<any> = new EventEmitter();

  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    const nomMethode = 'CesamInputComponent.ngOnInit';
    console.log(nomMethode + ' ' + JSON.stringify(this.model));
    if (this.type === 'checkbox' && this.model ){   
      this.checkboxModel = this.model.valeur === "1";
    }
  }


  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  /**
  * Set la nouvelle valeur sélectionnée par le user dans le model.
  */
  public attributCheckboxChange(){
    ModeleValeur.setBooleanValue(this.model, this.checkboxModel);
  }

  /**
  * Set la nouvelle valeur sélectionnée par le user dans le model.
  * @param value la valeur
  */
  public attributChange(value){
    ModeleValeur.setValue(this.model, value);
  }


  /**
  * Set la nouvelle valeur sélectionnée par le user dans le model.
  * @param value la valeur
  */
  public attributSelectChange(value){
    if(this.enumName){
      ModeleValeur.setEnumValue(this.model, ModeleEvenementService.enumerations[this.enumName].valeursEnumerations, value);
    }else if(this.itemsRequete){
      //On recupère l'itemRequete correspondant à la valeur selectionnée
      let obj : Objet = this.itemsRequete[value];
      if(obj){
        ModeleValeur.setObjetValue(this.model, obj);
      }
    }
    
  }
  
  public attributSelectChange1(value){
        const nomMethode = 'CesamInputComponent.attributSelectChange1';
        console.log(nomMethode);
        this.selectedValue.emit({
            value: value
        });
    }
}
