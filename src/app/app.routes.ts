import { Routes } from '@angular/router';
import { ListagemComponent } from '../app/layout/listagem/listagem.component';
import { NotaDetalheComponent } from '../app/layout/nota-detalhe/nota-detalhe.component';
import { GraficoMapaComponent } from '../app/layout/grafico-mapa/grafico-mapa.component';
import { ListagemFornecedoresComponent } from '../app/layout/fornecedores/listagem-fornecedores.component'
import { DetalheFornecedorComponent } from '../app/layout/detalhe-fornecedor/detalhe-fornecedor.component';
import { ListagemOrgaosComponent } from '../app/layout/orgaos/listagem-orgaos.component';
import { NotFoundComponent } from '../app/layout/not-found/not-found.component';
import { DashboardPageComponent} from '../app/layout/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notas-fiscais',
    pathMatch: 'full',
  },
  {
    path: 'notas-fiscais',
    component: ListagemComponent,
  },
  {
    path: 'notas-fiscais/:id',
    component: NotaDetalheComponent,
  },
  {
    path: 'graficos',
    component: DashboardPageComponent,
  },
  {
    path: 'fornecedores',
    component: ListagemFornecedoresComponent,
  },
  {
    path: 'fornecedores/:id',
    component: DetalheFornecedorComponent,
  },
  {
    path: 'orgaos', 
    component: ListagemOrgaosComponent
  },
  
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
