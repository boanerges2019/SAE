//
// import { Evenement } from 'app/shared/models/evenement/evenement';
//
// let TYPE_EVENEMENT_ACCIDENT =
// {
// 	codeInfo: "accident",
// 	planifiable: false,
// 	modelesAttributs: [
// 		{
// 			nom: "Nombre véhicules impliqués",
// 			codeType: "int",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: 1,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Types de Véhicule",
// 			codeType: "Types véhicules",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: [
//
// 			]
//
// 		},
// 		{
// 			nom: "Présence Blessés",
// 			codeType: "boolean",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Présence VIP",
// 			codeType: "boolean",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Nature chargement",
// 			codeType: "choix",
// 			codeValeurPossible: ["Passagers bus", "Denrées alimentaires", "Animaux vivants"],
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Gravité",
// 			codeType: "Gravité",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Descriptions véhicules",
// 			codeType: "Liste véhicules",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Causes accident",
// 			codeType: "choix",
// 			codeValeurPossible: ["Défaillance conducteur", "Obstacle", "Animal", "Crevaison", "Inconnu"],
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Dégâts aux domaines",
// 			codeType: "boolean",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Description dégâts",
// 			codeType: "string",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		},
// 		{
// 			nom: "Coordonnées impliqués",
// 			codeType: "Liste coordonnées",
// 			codeValeurPossible: undefined,
// 			valeurParDefaut: undefined,
// 			modelesAttributsComposites: undefined
//
// 		}
//
// 	]
// }
//
// export const EVENEMENTS: Evenement[] = [
//   {
// 	codeEtat: "En cours",
// 	codeModele: "accident",
//   horodateCreation: "2012-04-23T18:25:43.511Z",
//   horodateDebut: "2012-04-23T18:25:43.511Z",
//   horodateDebutPrevue: "2012-04-23T18:25:43.511Z",
//   horodateFin: "2012-04-23T18:25:43.511Z",
//   horodateFinPrevue: "2012-04-23T18:25:43.511Z",
// 	localisant: {
// 		identifiant: 459871,
// 		nom: "Evenement-459871",
// 		codeModeLocalisation: "codeModeLocalisation",
// 		codeZone: "codeZone",
// 		codelieu: "codelieu",
// 		codeSectionDebut: "codeSectionDebut",
// 		codeSensDebut: "codeSensDebut",
// 		prDebut: {
// 			codeAxe: "A43",
// 			numero: 127,
// 			abscisse: 200,
// 		},
// 		codeSectionFin: "codeSectionFin",
// 		codeSensFin: "codeSensFin",
// 		prFin: {
// 			codeAxe: "A43",
// 			numero: 197,
// 			abscisse: 101,
// 		},
// 		impliqueDeuxSens: true,
//
// 		emprises: {
// 			codeSection: "codeSection",
// 			prDebut: {
// 				codeAxe: "A43",
// 			numero: 127,
// 			abscisse: 200,
// 			},
// 			prFin: {
// 				codeAxe: "A43",
// 				numero: 197,
// 				abscisse: 101,
// 			},
// 			voies: ["VL", "VM", "VR", "VIE"],
// 		}
// 	},
// 	attributs:[
// 		{
// 			codeInfo: "origine",
// 			valeur: "Alerte",
// 		},
// 		{
// 			codeInfo: "listCommentaires",
// 			attributsComposites: [
// 				{
// 					codeInfo: "commentaire",
// 					attributsComposites: [
// 						{
// 							codeInfo: "commentaire",
// 							valeur: "Comentaire 1",
// 							attributsComposites: undefined
// 						},
// 						{
// 							codeInfo: "horodate",
// 							valeur: "2012-04-23T18:25:43.511Z",
// 							attributsComposites: undefined
// 						},
// 					]
// 				},
// 				{
// 					codeInfo: "commentaire",
// 					attributsComposites: [
// 						{
// 							codeInfo: "commentaire",
// 							valeur: "Comentaire 2",
// 							attributsComposites: undefined
// 						},
// 						{
// 							codeInfo: "horodate",
// 							valeur: "2012-04-23T18:25:43.511Z",
// 							attributsComposites: undefined
// 						},
// 					]
// 				},
// 				{
// 					codeInfo: "commentaire",
// 					attributsComposites: [
// 						{
// 							codeInfo: "commentaire",
// 							valeur: "Comentaire 3",
// 							attributsComposites: undefined
// 						},
// 						{
// 							codeInfo: "horodate",
// 							valeur: "2012-04-23T18:25:43.511Z",
// 							attributsComposites: undefined
// 						},
// 					]
// 				},
// 			]
// 		},
// 		{
// 			codeInfo: "intervenant",
// 			valeur: "Nom (ou numéro radio) de l’intervenant, en saisie libre Le nom est renseigné automatiquement par le système quand l’utilisateur effectue l’appel sortant depuis le plan d’action",
// 			horodateDerniereModification: "2012-04-23T18:25:43.511Z",
// 		}
//
// 	]
//
// }
// ],
