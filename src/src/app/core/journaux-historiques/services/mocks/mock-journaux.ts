
function randomIndex (intValue: number)  {
  return Math.floor(Math.random()*intValue);
}

function randomItemFromArray(array)  {
  return array[randomIndex(array.length)];
}

function addSecond(s){
  let now = new Date();
  now.setSeconds(now.getSeconds() + s);
  return now;
}

let entities = ["alertes", "appels", "balisage", "diffusionBulletins", "evenement", "macroCommande", "planAction", "strategie", "viabilite"];
let codeEtats = ["EN_COURS", "TERMINE", "SIGNALE", "VALIDE"];
let localisations = ["A43 Sens 1 PK 127+100", "	A43 Sens 1 PK 128+200", "A43 Sens 1 PK 129+400", "A43 Sens 1 PK 135+600", ""];
let operateurs = ["Jean Etienne Martin", "Julie DARMIAN", "Kevin MAYER", ""];
let equipements = ["PMV 4x12", "PMV 3x15", "PMV 4x18", ""];
let postes = [];
let horodates = [addSecond(20), addSecond(30), addSecond(56), ""];


export const JOURNAUX = (() => {
  let data: any = {};
  data.result = [];

  for(let i=0; i < 5000; i++){
    let item = {
      nature: randomItemFromArray(entities),
      description: `Description ${i+1}`,
      codeEtat: randomItemFromArray(codeEtats),
      equipement: randomItemFromArray(equipements),
      localisation: randomItemFromArray(localisations),
      operateur: randomItemFromArray(operateurs),
      poste: "",
      horodate: randomItemFromArray(horodates),
    }
    data.result.push(item);
  }
  return data.result;
})();
