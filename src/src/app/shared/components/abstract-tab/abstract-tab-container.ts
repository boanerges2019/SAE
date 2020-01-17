export class AbstractTabContainer   {

  activeTab: string;
  
  public setActiveTab(codeTab: string){
    const nomMethode = 'AbstractTabContainer.setActiveTab'  
    console.log(nomMethode+ " : " + codeTab);  
    this.activeTab = codeTab;
  }  

}