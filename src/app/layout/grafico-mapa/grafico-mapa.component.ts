import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { GraficoMapaService, ResumoNotasPorEstadoDTO } from '../../services/grafico-mapa.service';
import { EChartsOption, registerMap } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-grafico-mapa',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './grafico-mapa.component.html',
  styleUrl: './grafico-mapa.component.css',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ]
})
export class GraficoMapaComponent implements OnInit {
  option: EChartsOption = {};
  loading = true;
  resumoNotas: ResumoNotasPorEstadoDTO[] = [];

  constructor(private graficoService: GraficoMapaService) {}

  async ngOnInit(): Promise<void> {
    try {
      const geoJson = await import('../../../../public/geojson/brazil-states.json');

      registerMap('BR', geoJson.default as any);

      this.graficoService.getResumoNotasPorEstado().subscribe((dados: ResumoNotasPorEstadoDTO[]) => {

        this.resumoNotas = dados;
        this.gerarMapa(dados);
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    } catch (error) {
      console.error('[grafico-mapa] Erro ao carregar GeoJSON:', error);
      this.loading = false;
    }
  }

  gerarMapa(dados: ResumoNotasPorEstadoDTO[]): void {
    const valoresPorUF = dados.map(d => ({
      name: d.ufNome,
      value: d.valorTotalNotas
    }));

    this.option = {
      title: {
        text: 'Valor Total de Notas por Estado (UF)',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const estado = params.name;
          const info = this.resumoNotas.find((d) => d.ufNome === estado);
          const valorFormatado = (params.value || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          return `
            <strong>${estado}</strong><br/>
            Valor Total: ${valorFormatado}<br/>
            Quantidade de Notas: ${info?.quantidadeNotas ?? 0}
          `;
        },
      },
      visualMap: {
        min: 0,
        max: Math.max(...valoresPorUF.map((e) => e.value)),
        left: 'right',
        top: 'bottom',
        text: ['Alto', 'Baixo'],
        inRange: {
          color: ['#e0f7fa', '#4dd0e1', '#00796b', '#fbc02d', '#e53935'],
          // azul claro → azul médio → verde → amarelo → vermelho
        },
        calculable: true,
      },

      series: [
        {
          type: 'map',
          map: 'BR',
          roam: false,
          emphasis: {
            label: {
              show: true,
            },
          },
          data: valoresPorUF,
        },
      ],
    };
  }
}
