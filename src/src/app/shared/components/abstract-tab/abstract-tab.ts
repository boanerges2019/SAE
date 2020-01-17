import { Input } from '@angular/core';
import { TabDefinition } from './tab-definition';
import { AbstractTabContainer } from './abstract-tab-container';

export class AbstractTab   {

  @Input()  
  previousTabs: Array<TabDefinition> = [];  

  @Input()  
  nextTabs: Array<TabDefinition> = [];   

  @Input()
  parentComponent: AbstractTabContainer;
  
  public setActiveTab(codeTab: string){
    const nomMethode = 'AbstractTab.setActiveTab'  
    console.log(nomMethode+ " : " + codeTab); 
    if(this.parentComponent){
        this.parentComponent.setActiveTab(codeTab);
    }
  }  

  public gotoTab(codeTab: string){
      //TODO : voir pour utiliser route angular ??
  }


}