import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { AbastecimentoRegistroComponent } from '../../pages/abastecimento/abastecimentoRegistro.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AbastecimentoModalComponent } from 'src/app/modal/abastecimentoModal/abastecimentoModal.component';
import { RelatorioModalComponent } from 'src/app/modal/relatorioModal/relatorioModal.component';
import { LoginComponent } from 'src/app/pages/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    AbastecimentoRegistroComponent,
    AbastecimentoModalComponent,
    RelatorioModalComponent,
    LoginComponent
  ]
})

export class AdminLayoutModule {}
