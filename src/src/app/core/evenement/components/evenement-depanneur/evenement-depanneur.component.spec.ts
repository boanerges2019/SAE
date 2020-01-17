import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { MockModeleEvenementService } from 'app/shared/services/evenement/mock-modele-evenement.service';
import { EvenementDepanneurComponent } from './evenement-depanneur.component';

describe('EvenementDepanneurComponent', () => {
  let component: EvenementDepanneurComponent;
  let fixture: ComponentFixture<EvenementDepanneurComponent>;
  let evenement = {
   id: 123395,
   identifiant: 123395,
   nom: "Evenement Vide",
   codeEtat: "En cours",
   codeModele: "accident",
   horodateCreation: new Date(),
   horodateDebut: new Date(),
   horodateDebutPrevue: new Date(),
   horodateFin: new Date(),
   horodateFinPrevue: new Date(),
   attributs: {
     categorie: {
       valeur: 'INCIDENT_SUR_CHAUSSEE'
     },
     groupe: {
       valeur: 'Groupe 1'
     },
   },
   localisant: { }
 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementDepanneurComponent ],
      providers: [
          {
              provide: ModeleEvenementService,
              useClass: MockModeleEvenementService
            }
      ]
    }).overrideComponent(EvenementDepanneurComponent, {
        set: {
            template: ''
        }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementDepanneurComponent);
    component = fixture.componentInstance;
    component.evenement = evenement;
    component.ngOnInit();
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
