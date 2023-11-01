import { Routes } from '@angular/router';

import { AbastecimentoRegistroComponent } from '../../pages/abastecimento/abastecimentoRegistro.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/pages/login/AuthGuard';

export const AdminLayoutRoutes: Routes = [
    { path: 'abastecimentoRegistro', component: AbastecimentoRegistroComponent, canActivate: [AuthGuard] },
    { path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },

];
