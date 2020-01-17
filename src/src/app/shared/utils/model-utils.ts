export const ModelUtils = {

      /**
       * Construit un model conforme à ce que le composant ng-select attend avec un mdoel comportant un object(id, text).l
       * @param  {[type]} item=>{item.id=item[field];item.text=item.nom;} [description]
       * @return {[type]}                                                 [description]
       */
      buildNgSelectModel: function (idField: string, textField: string, data: any[]) {
        idField = idField || 'identifiant';
        textField = textField || 'nom';
        data.map(item => {
            item.id = item[idField]; // par codinfo, id, ....
            item.text = item[textField]; // par nom, description, ...
        });
return data;
      }
}
