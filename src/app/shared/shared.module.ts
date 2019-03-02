import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  declarations: [
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
  exports: [
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ]
})
export class SharedModule { }
