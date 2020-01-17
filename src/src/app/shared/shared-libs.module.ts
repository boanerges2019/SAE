import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; // Imports for loading & configuring the in-memory web api
// import { InMemoryDataService }  from 'app/shared/services/mock/in-memory-data.service';

import { SelectModule } from 'ng2-select';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AlertModule } from 'ng2-bootstrap';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { Ng2Webstorage } from 'ngx-webstorage';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/ng2-toastr';
import { NgGridModule } from 'angular4-grid';
import {TooltipModule} from "ng2-tooltip";
//import { TooltipModule } from 'ng2-bootstrap';
//import { Ng4FilesModule } from 'angular4-files-upload';

const PERFECT_SCROLLBAR_CONFIG:PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


export class CustomToastOption extends ToastOptions {
    animate = 'flyRight'; // you can override any options available
    showCloseButton = false;
    dismiss = 'auto';
    positionClass = 'toast-top-full-width';
    newestOnTop = false;
}

@NgModule({
    declarations: [
        PdfViewerComponent
    ],
    imports: [
        CommonModule,
        AlertModule.forRoot(),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        SelectModule,
        NguiAutoCompleteModule,
        Ng2Webstorage,
        NgGridModule,
        TooltipModule,
        ToastModule.forRoot()
        //InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    exports: [
        CommonModule,
        AlertModule,
        PerfectScrollbarModule,
        SelectModule,
        NguiAutoCompleteModule,
        Ng2Webstorage,
        NgGridModule,
        TooltipModule,
        PdfViewerComponent
    ],
    providers: [
        ToastsManager,
        {provide: ToastOptions, useClass: CustomToastOption},
    ]
})
export class SharedLibsModule {
}
