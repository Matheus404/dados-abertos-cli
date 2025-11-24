import { Component, OnInit, inject } from '@angular/core';
import { NgxEchartsDirective, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { GraficoFornecedorService } from '../../services/pizza-grafico.service';
import { PizzaGrafico } from '../../models/pizza-grafico';
import { AnoStoreService } from '../../services/ano-store.service';

@Component({
  selector: 'app-pizza-grafico',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ],
  templateUrl: './pizza-grafico.component.html',
  styleUrl: './pizza-grafico.component.css'
})
export class PizzaGraficoComponent implements OnInit {

  private service = inject(GraficoFornecedorService);
  private anoStore = inject(AnoStoreService);

  options: EChartsOption = {};
  loading = true;

  dados: PizzaGrafico[] = [];

  ngOnInit(): void {
    // Escuta mudança do ano global
    this.anoStore.anoSelecionado$.subscribe(ano => {
      this.buscarDados(ano);
    });
  }

  buscarDados(ano: number): void {
    this.loading = true;

    this.service.listarPizza(ano).subscribe({
      next: (response) => {
        this.dados = response;

        const ordered = [...this.dados].sort((a, b) => b.valorTotal - a.valorTotal);

        this.options = {
          title: {
            text: `Top 100 fornecedores com maior valor de notas somandas em (${ano})`,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (item: any) => {
              const f = item.data.original;
              return `
                <b>${f.nome}</b><br/>
                CNPJ/CPF: ${f.cnpjOuCpf}<br/>
                UF: ${f.uf}<br/>
                Total: R$ ${f.valorTotal.toLocaleString('pt-BR')}
              `;
            },
          },
          
          series: [
            {
              name: 'Total por fornecedor',
              type: 'pie',
              radius: '60%',
              top: '60px',
              data: ordered.map((f) => ({
                value: f.valorTotal,
                name: f.nome,
                original: f,
              })),
            },
          ],
        };

        this.loading = false;
      }
    });
  }
}
