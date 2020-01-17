export const MOCK_FONCTIONS = {

  randomWord: () => Math.random().toString(36).replace(/[^a-z]+/g, ''),

  randomSentence: (n) => {
    let res = [];
    for(let i=0; i< n; i++ ){
      res.push(MOCK_FONCTIONS.randomWord()+" ");
    }
    return res.join(",");
  },

  randomIndex: (intValue: number) => {
    return Math.floor(Math.random()*intValue);
  },

  randomItemFromArray: (array) => {
    let index = MOCK_FONCTIONS.randomIndex(array.length);
    return array[index];

  },

  randomType: () => {
    let types = MOCK_FONCTIONS.getPMVTypes();
    return types[MOCK_FONCTIONS.randomIndex(types.length)];
  },

  getPMVTypes: () => {
    return [
      "accident",
      "animal_errant",
      "basculement_1voie",
      "bouchon",
      "brouillard",
      "chaines_obligatoire",
      "chaussee_glissante",
      "danger",
      "double_sens",
      "interdit_depasser_pl",
      "interdit_depasser_vl",
      "limitation_50",
      "limitation_70",
      "limitation_90",
      "limitation_110",
      "neige",
      "pieton",
      "reduction_1voie_droite",
      "reduction_1voie_gauche",
      "reduction_chaussee",
      "sortie_fermee",
      "sortie_obligatoire",
      "travaux",
      "vent",
    ];
  },




}
