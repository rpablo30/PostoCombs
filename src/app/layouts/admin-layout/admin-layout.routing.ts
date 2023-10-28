import { Routes } from '@angular/router';

import { AbastecimentoRegistroComponent } from '../../pages/abastecimento/abastecimentoRegistro.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'abastecimentoRegistro',      component: AbastecimentoRegistroComponent },
    { path: 'tables',         component: TablesComponent },
];
