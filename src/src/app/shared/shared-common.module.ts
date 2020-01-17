import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedLibsModule } from './shared-libs.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2DatetimePickerModule } from './components/ng2-datetime-picker/ng2-datetime-picker.module';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { HoverDirective } from './directives/hover.directive';
import { customHttpProvider } from './providers/http.provider';
import { ReferenceService } from './services/reference/reference.service';
import { EnumerationsService } from './services/reference/enumerations.service';
import { EventManager } from './services/event/event-manager.service';
import { CollapseDirective } from './directives/collapse.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CesamDatePipe } from './pipes/cesam-date.pipe';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { PrFormatPipe } from './pipes/pr-format.pipe';
import { CtxAccessDirective } from './directives//ctx-access.directive';
import { CesamLoaderComponent } from './components/cesam-loader/cesam-loader.component';
import { ConfirmActionDirective } from './directives//confirm-action.directive';
import { CesamNumberDirective } from './directives/cesam-number.directive';
import { LabelCasePipe } from './pipes/label-case.pipe';
import { SelectItemDirective } from './directives/select-item.directive';
import { CesamInputComponent } from './components/cesam-input/cesam-input.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { CurrentTimeComponent } from './components/current-time/current-time.component';
import { CesamRequiredDirective } from './directives/cesam-required.directive';
import { ChangeDropDirectionDirective } from './directives/change-drop-direction.directive';
import { InfiniteScrollerDirective } from '../../app/shared/directives/infinite-scroller.directive';
import { CacheService} from '../../app/shared/services/cache/cache.service';
import { CesamPlanificationComponent } from './components/planification/cesam-planification.component';
import { HeaderTabComponent } from './components/header-tab/header-tab.component';
import { DetailMacroCommandeComponent } from './components/detail-macro-commande/detail-macro-commande.component';
import { ListModelMacroComponent } from './components/list-model-macro/list-model-macro.component';
import { CesamPopupComponent } from './components/cesam-popup/cesam-popup.component';
import { CesamUploadDirective } from '../../app/shared/directives/cesam-upload.directive';
import { CesamUploadComponent } from '../../app/shared/components/cesam-upload/cesam-upload.component';
import { AbstractTab } from './components/abstract-tab/abstract-tab';
import { AbstractTabContainer } from './components/abstract-tab/abstract-tab-container';


@NgModule({
    declarations: [
        AlertErrorComponent,
        AlertMessageComponent,
        CollapseDirective,
        OrderByPipe,
        CesamDatePipe,
        ShortDatePipe,
        PrFormatPipe,
        CtxAccessDirective,
        CesamLoaderComponent,
        ConfirmActionDirective,
        CesamNumberDirective,
        HoverDirective,
        LabelCasePipe,
        SelectItemDirective,
        CesamRequiredDirective,
        CesamInputComponent,
        TimetableComponent,
        CurrentTimeComponent,
        ChangeDropDirectionDirective,
        InfiniteScrollerDirective,
        CesamPlanificationComponent,
        HeaderTabComponent,
        DetailMacroCommandeComponent,
        ListModelMacroComponent,
        CesamPopupComponent,
        CesamUploadDirective,
        CesamUploadComponent

    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        SharedLibsModule,
        Ng2DatetimePickerModule,
        BrowserAnimationsModule
    ],
    exports: [
        AlertErrorComponent,
        AlertMessageComponent,
        CollapseDirective,
        OrderByPipe,
        CesamDatePipe,
        ShortDatePipe,
        PrFormatPipe,
        CtxAccessDirective,
        CesamLoaderComponent,
        ConfirmActionDirective,
        CesamNumberDirective,
        HoverDirective,
        LabelCasePipe,
        SelectItemDirective,
        CesamRequiredDirective,
        CesamInputComponent,
        TimetableComponent,
        CurrentTimeComponent,
        ChangeDropDirectionDirective,
        Ng2DatetimePickerModule,
        InfiniteScrollerDirective,
        CesamPlanificationComponent,
        HeaderTabComponent,
        DetailMacroCommandeComponent,
        ListModelMacroComponent,
        CesamPopupComponent,
        CesamUploadDirective,
        CesamUploadComponent              
    ],
    providers: [
        ReferenceService,
        EnumerationsService,
        EventManager,
        CacheService,
        // InterceptableHttp,
        customHttpProvider()
    ]
})
export class SharedCommonModule {
}
