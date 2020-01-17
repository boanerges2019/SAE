import { Component, OnInit } from '@angular/core';
import { AbstractTab } from '../abstract-tab/abstract-tab';

export class AbstractBase extends AbstractTab implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {

  }

  /**
  * @param model.
  * @param ordr arc or desc
  * @param items les données à triées
  * @return Tri le tableau des évenements.
  */
  public sortTable(property: string, order: boolean , items: any[], fieldCte: any){
    items = items.sort((item1,item2) => {
        return this.compare(item1, item2, property, fieldCte); //FieldEvenementCte.FIELD
      });
    if (!order)  items.reverse();
    return items;
  }

  /**
  * Compare les 2 items selon le critère passé  en paramètres
  * @param emprises
  * @return trie les emprise
  */
  public compare(item1: any, item2: any, property: string, fieldCte: any): number {
    let prop = fieldCte[property];
    if (item1[prop] < item2[prop]) return -1;
    if (item1[prop] > item2[prop]) return 1;
    return 0;
  }
}
