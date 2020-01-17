import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { AlertService } from 'app/shared/services/alert/alert.service';
import { Subscription } from 'rxjs/Rx';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'alert-error',
  providers: [AlertService],
  template: `
          <!-- div class="alerts col-xs-12" role="alert">
              <p *ngFor="let alert of alerts">
                  <ngb-alert
                    [type]="alert.type"
                    (close)="closeAlert(alert)"
                    [dismissible]="true">
                    {{ alert.msg}}
                  </ngb-alert>
              </p>
          </div -->`,
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent implements OnDestroy {

     alerts: any[];
     cleanHttpErrorListener: Subscription;

    constructor(private toastr: ToastsManager, vcr: ViewContainerRef,
                private alertService: AlertService, private eventManager: EventManager ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.alerts = [];
        this.cleanHttpErrorListener = eventManager.subscribe(EventManagerCte.EVENT_NAME.cesamHttpError, (response) => {
            let i;
            const httpResponse = response.content.error;
            switch (httpResponse.status) {
                case 0:
                    //this.addErrorAlert('Seveur introuvable !');
                    this.toastr.error('Seveur introuvable !');
                    break;

                case 400:
                    this.toastr.error(`Erreur ${httpResponse.statusText}: ${httpResponse.url}`);
                    break;

                case 404:
                    this.toastr.error('Not found', `url inconnue: ${httpResponse.url}`);
                    break;

                default:
                    if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {
                        // this.addErrorAlert(httpResponse.json().message);
                        this.toastr.error(httpResponse.json().message);
                    } else {
                       // this.addErrorAlert(JSON.stringify(httpResponse));
                        this.toastr.error(JSON.stringify(httpResponse));
                    }
            }
        });
    }

    ngOnDestroy() {
        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {
            this.eventManager.destroy(this.cleanHttpErrorListener);
            this.alerts = [];
        }
    }

    addErrorAlert(message, key?, data?) {
        key = key && key !== null ? key : message;
        this.alerts.push(
            this.alertService.addAlert(
                {
                    type: 'danger',
                    msg: key,
                    params: data,
                    timeout: 1000,
                    toast: this.alertService.isToast(),
                    scoped: true
                },
                this.alerts
            )
        );
    }

    public closeAlert(alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
     }

}
