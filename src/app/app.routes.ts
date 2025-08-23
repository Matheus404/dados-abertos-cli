import { Routes } from '@angular/router';
import { ListagemComponent } from '../app/layout/listagem/listagem.component';
import { NotaDetalheComponent } from '../app/layout/nota-detalhe/nota-detalhe.component';
import { GraficoMapaComponent } from '../app/layout/grafico-mapa/grafico-mapa.component';
import { ListagemFornecedoresComponent } from '../app/layout/fornecedores/listagem-fornecedores.component'
import { DetalheFornecedorComponent } from '../app/layout/detalhe-fornecedor/detalhe-fornecedor.component';
import { NotFoundComponent } from '../app/layout/not-found/not-found.component';

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
    component: GraficoMapaComponent,
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
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
