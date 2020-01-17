import { Component, OnInit } from '@angular/core';
import { AstreinteService } from 'app/core/astreintes/services/astreintes.service';
import { AstreinteWebsocketService } from 'app/core/astreintes/services/astreintes-websocket.service';
import { ViabilitesHivernalesServiceCte } from '../../constantes/viabilites-hivernales.constante';
import * as _ from 'underscore';

@Component({
  selector: 'intervenants-astreinte',
  templateUrl: './intervenants-astreinte.component.html',
  styleUrls: ['./intervenants-astreinte.component.scss']
})
export class IntervenantsAstreinteComponent implements OnInit {

    intervenantsAstreintesPraz:any[]=[];
    intervenantsAstreintesCesam:any[]=[];
    intervenantsAstreintes:any[]=[];
    model:any={};

  constructor(private astreinteService:AstreinteService) {

  }

  ngOnInit() {
      this.model.configCte =  ViabilitesHivernalesServiceCte;
      this.intervenantsAstreintes=[];
      this.getIntervenantsAstreintesPraz();
      /*this.getIntervenantsAstreintesCesam();
      this.planningIntervenants();*/
  }

    public getIntervenantsAstreintesPraz(){
        this.astreinteService.getIntervenantAstreintesForVH(ViabilitesHivernalesServiceCte.CODES_ASTREINTES.PRAZ).subscribe(
                response => {
                this.intervenantsAstreintesPraz = response;
                    this.getIntervenantsAstreintesCesam();
            }
        );
    }

    public getIntervenantsAstreintesCesam(){
        this.astreinteService.getIntervenantAstreintesForVH(ViabilitesHivernalesServiceCte.CODES_ASTREINTES.CESAM).subscribe(
                response => {
                    this.intervenantsAstreintesCesam = response;
                    this.planningIntervenants();

            }
        );
    }

    public planningIntervenants(){
        this.astreinteService.getPlanningAstreintes(true, new Date()).subscribe(response => {
            let plannings = response;
            if(plannings[ViabilitesHivernalesServiceCte.CODES_ASTREINTES.CESAM]){
                let celCesams = plannings[ViabilitesHivernalesServiceCte.CODES_ASTREINTES.CESAM].cellules;
                celCesams.forEach(cel =>{
                    this.intervenantsAstreintes.push(this.intervenantsAstreintesCesam[cel.codeRessource]);
                });
            }

            if(plannings[ViabilitesHivernalesServiceCte.CODES_ASTREINTES.PRAZ]){
                let celPraz = plannings[ViabilitesHivernalesServiceCte.CODES_ASTREINTES.PRAZ].cellules;
                celPraz.forEach(cel =>{
                    this.intervenantsAstreintes.push(this.intervenantsAstreintesPraz[cel.codeRessource]);
                });
            }


        });
    }

}
