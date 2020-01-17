import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { SharedCommonModule } from './shared-common.module';
import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedCommonModule,
    SharedLibsModule,
  ],
  exports: [
    SharedCommonModule,
    SharedLibsModule,
  ],
  providers: []
})
export class SharedModule { }
