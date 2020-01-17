// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { EvenementComponent } from './evenement.component';
// import { MockComponent } from 'ng2-mock-component';
// import  { Evenement } from 'app/shared/models/generic/Evenement';
//
// describe('EvenementComponent', () => {
//   let component: EvenementComponent;
//   let fixture: ComponentFixture<EvenementComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         EvenementComponent,
//         MockComponent({ selector: 'evenement-commun' }),
//         MockComponent({ selector: 'evenement-localisation' }),
//         MockComponent({ selector: 'evenement-emprise' }),
//         MockComponent({ selector: 'evenement-liens' }),
//         MockComponent({ selector: 'evenement-accident' })
//       ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(EvenementComponent);
//     component = fixture.componentInstance;
//     let evenement: Evenement = {
//       identifiant: 2,
//       nom: 'Evenement-2.2',
//       type: 'travaux',
//       localisant: {
//           nom: 'PK 852,170 - SENS 2',
//       },
//       codeEtat: 'Terminé',
//       horodateDebut: "2012-04-23T18:25:43.511Z",
//       horodateFin:  "2012-04-23T19:25:43.511Z"
//     };
//     component.evenement = evenement;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
