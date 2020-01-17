import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from '../app/app.component';
import { SharedModule } from '../app/shared/shared.module';
import { CoreModule } from '../app/core/core.module';
import { PartialsModule } from '../app/partials/partials.module';
import { AstreintesModule } from './core/astreintes/astreintes.module';




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,

        CoreModule,
        PartialsModule,
        SharedModule,
        AstreintesModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: './'}
    ],
    bootstrap: ([AppComponent])
})
export class AppModule {
}
