import { Component, OnInit, Input } from '@angular/core';
import { Ressource } from '../../../../shared/models/generic/Ressource';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { Subscription } from 'rxjs';
import { AnnuaireCte } from '../../constantes/annuaire.constantes';
import { AnnuaireService } from '../../services/annuaire.services';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';

@Component({
  selector: 'details-annuaires',
  templateUrl: './details-annuaires.component.html',
  styleUrls: ['./details-annuaires.component.scss']
})
export class DetailsAnnuairesComponent extends AbstractTab implements OnInit {

  
  ressourceSelectionnee: Ressource;
  subscriptions:Subscription[] = [];
  atts: { [key: string]: any };

  constructor(private eventManager:EventManager,
              private annuaireService: AnnuaireService
              ) {
                super();
                this.atts = AnnuaireCte.ATTRIBUTS_RESSOURCES;
   }

  ngOnInit() {
            //Si c'est une ressource qui a été sélectionnée, on la prend directement
            this.subscriptions.push(this.eventManager.subscribe(AnnuaireCte.EVENT_NAME.fireRessourceSelectionnee, (response) => {
              this.ressourceSelectionnee = response.content;
            }));

            //Si c'est le code de la ressource, on va chercher la ressource sur le serveur
            this.subscriptions.push(this.eventManager.subscribe(AnnuaireCte.EVENT_NAME.fireCodeRessourceSelectionnee, (notif) => {
              const nomMethode = 'ngOnInit.annuaireService.getRessource';
              this.annuaireService.getRessource(notif.content).subscribe(                
                response => {                   
                   this.ressourceSelectionnee = response 
                   console.info(nomMethode + ': (' + notif.content + ') ' + response.statusText);
                  },
                  error => {
                    console.error(nomMethode +': (' + notif.content + ') ' + error);
                  },
                  () => {}
              )
            }));
  }

  ngOnDestroy() {    
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions.length = 0;
 }  


  selectionnerRessource(ress: any){

    this.ressourceSelectionnee = ress;
  }



  composerNumero(typeNumero: string){
    const nomMethode = 'composerNumero';
    console.log(nomMethode + ' : ' + typeNumero);
    if(this.ressourceSelectionnee && typeNumero){
      this.annuaireService.appelerRessource(this.ressourceSelectionnee.codeInfo,typeNumero).subscribe();
    }    
  }


}
