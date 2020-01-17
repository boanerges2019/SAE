function addSecond(s){
  let now = new Date();
  now.setSeconds(now.getSeconds() + s);
  return now;
}

export const ALERTES = [
  {
     id: 99000,
     identifiant: 99000,
     nom: "CME Perte artères alimentation A + B",
     level: "degrade",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99010,
     identifiant: 99010,
     nom: "Alerte CME Défaut extracteur",
     level: "critique",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99020,
     identifiant: 99020,
     level: "fermeture",
     nom: "Alerte CME Perte plus de 5 accélérateurs !",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99021,
     identifiant: 99021,
     level: "critique",
     nom: "Alerte CME Indispo. mode surpression > 48h",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99022,
     identifiant: 99022,
     nom: "Alerte détection hors gabarit !",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99023,
     identifiant: 99023,
     nom: "Alerte détection d’accès !",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99025,
     identifiant: 99025,
     level: "fermeture",
     nom: "Alerte ouverture de porte !",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99030,
     identifiant: 99030,
     level: "degrade",
     nom: "Alerte neige !",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99040,
     identifiant: 99040,
     level: "critique",
     nom: "Alerte seuil haut pollution !",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99050,
     identifiant: 99050,
     nom: "Alerte péager !",
     level: "degrade",
     horodateDebut: "2017-11-08T15:41:26.627Z",
     codeEtat: "En cours",
     codeModele: "A traiter",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
]



export const JOURNAL_ALERTES = [
  {
     id: 99000,
     identifiant: 99000,
     nom: "CME Perte artères alimentation A + B",
     level: "degrade",
     horodateDebut: "31/03/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Hervé Villard",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99010,
     identifiant: 99010,
     nom: "Alerte CME Défaut extracteur",
     level: "critique",
     horodateDebut: "31/04/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Johnny Malouf",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99020,
     identifiant: 99020,
     level: "fermeture",
     nom: "Alerte CME Perte plus de 5 accélérateurs !",
     horodateDebut: "31/05/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Jean Déduis",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99021,
     identifiant: 99021,
     level: "critique",
     nom: "Alerte CME Indispo. mode surpression > 48h",
     horodateDebut:"31/06/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Jean Passe",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99022,
     identifiant: 99022,
     nom: "Alerte détection hors gabarit !",
     horodateDebut: "31/07/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Marcel Pernaud",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99023,
     identifiant: 99023,
     nom: "Alerte détection d’accès !",
     horodateDebut: "31/08/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Hock Alme",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99025,
     identifiant: 99025,
     level: "fermeture",
     nom: "Alerte ouverture de porte !",
     horodateDebut: "31/09/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Velvet Rose",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99030,
     identifiant: 99030,
     level: "degrade",
     nom: "Alerte neige !",
     horodateDebut: "31/10/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Thibault Foucault",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99040,
     identifiant: 99040,
     level: "critique",
     nom: "Alerte seuil haut pollution !",
     horodateDebut: "31/11/2017 12:59:59",
     codeEtat: "A traiter",
     codeModele: "A traiter",
     operateur:"Suzan Boyle",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
  {
     id: 99050,
     identifiant: 99050,
     nom: "Alerte péager !",
     level: "degrade",
     horodateDebut: "31/12/2017 12:59:59",
     codeEtat: "Terminé",
     codeModele: "A traiter",
     operateur:"David Day",
     localisant: {
       nom: "AITON/SENS1/Sens2 - PK 128.400"
     },
     attributs: {
     },
  },
]
