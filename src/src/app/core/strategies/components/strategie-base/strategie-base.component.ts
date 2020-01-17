import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import * as moment from 'moment';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { FieldStrategieCte } from 'app/core/strategies/constantes/field-strategie.constante';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { AbstractBase } from 'app/shared/components/abstract-base/abstract-base';
/**
* Componsant de base des Stratégies d'Affichages.
* @author SPIE.
*/
@Component({
  selector: 'strategie-base',
  template: ''
})
export class StrategieBaseComponent extends AbstractBase implements OnInit , OnDestroy{

  model: { [key: string]: any } = {};
  subscriptions: Subscription[] = [];

  constructor(){
    super();
  }

  ngOnInit() {
    this.model.field = FieldStrategieCte.FIELD;
    this.model.configCte = FieldStrategieCte;
    this.model.contexte = CtxCte.CTX;

    this.model.sort = {}; // initialisation du tri.
    this.model.sort.order = false;

    this.model.ctx = {}; // initialisation du contexte.

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  //----------------------------------------------------------------------------
  //-- ACTIONS
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  //-- LISTENERS
  //----------------------------------------------------------------------------


  //----------------------------------------------------------------------------
  //-- UTILS.
  //----------------------------------------------------------------------------


}
