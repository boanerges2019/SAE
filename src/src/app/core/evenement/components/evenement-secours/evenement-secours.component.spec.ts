// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { EvenementSecoursComponent } from './evenement-secours.component';
// import { SelectedDirective } from 'app/shared/directives/selected-alerte.directive';
// import { MockComponent } from 'ng2-mock-component';
//
// describe('EvenementSecoursComponent', () => {
//   let component: EvenementSecoursComponent;
//   let fixture: ComponentFixture<EvenementSecoursComponent>;
//   let evenement =         {
//            id: 123395,
//            identifiant: 123395,
//            nom: "Evenement Vide",
//            codeEtat: "En cours",
//            codeModele: "accident",
//            horodateCreation: new Date(),
//            horodateDebut: new Date(),
//            horodateDebutPrevue: new Date(),
//            horodateFin: new Date(),
//            horodateFinPrevue: new Date(),
//            attributs: {
//              categorie: {
//                valeur: 'INCIDENT_SUR_CHAUSSEE'
//              },
//              groupe: {
//                valeur: 'Groupe 1'
//              },
//            },
//            localisant: { }
//          };
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ EvenementSecoursComponent, SelectedDirective ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(EvenementSecoursComponent);
//     component = fixture.componentInstance;
//     component.isCollapsedContent = false;
//     component.evenement = evenement;
//     component.currentCtx = 'EDIT_EVENEMENT';
//     fixture.detectChanges();
//   });
//
//   it('should create EvenementSecoursComponent', () => {
//     expect(component).toBeTruthy();
//   });
// });
