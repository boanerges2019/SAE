import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'right-vh',
  templateUrl: './right-vh.component.html',
  styleUrls: ['./right-vh.component.scss']
})
export class RightVhComponent implements OnInit {

  ongletActif: { [key: string]: any }; // onglet actif

  constructor() { }

  ngOnInit() {
    this.ongletActif = {
        intervenantAstreinte: true,
        vehiculeSftrf: false,
    }
  }

  //----------------------------------------------------------------------------
  //-- UTILITAIRES / VALIDATIONS.
  //----------------------------------------------------------------------------
  /**
  * Détermine l'onglet actif.
  */
  private resetOngletAction(){
    for(const field in this.ongletActif){
      this.ongletActif[field] = false;
    }
  }

  /**
  * Débranche sur l'onglet cliqué.
  */
  public gotoOnglet(link): void {
    switch(link){
      case 'intervenantAstreinte':
        this.resetOngletAction();
        this.ongletActif.intervenantAstreinte = true;
        break;
      case 'vehiculeSftrf':
        this.resetOngletAction();
        this.ongletActif.vehiculeSftrf= true;
        break;

      default: return;
    }
  }


}
