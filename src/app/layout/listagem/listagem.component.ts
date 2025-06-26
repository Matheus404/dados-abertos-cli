import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {
  NotaFiscalService,
  NotaFiscal,
} from '../../services/nota-fiscal.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
})
export class ListagemComponent implements OnInit {
  notas: NotaFiscal[] = [];
  displayedColumns: string[] = [
    'numero',
    'data',
    'fornecedor',
    'orgao',
    'valor',
    'acoes',
  ];

  pagina = 0;
  tamanhoPagina = 10;
  totalRegistros = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private notaService: NotaFiscalService) {}

  ngOnInit(): void {
    this.carregarNotas(this.pagina, this.tamanhoPagina);
  }

  carregarNotas(pagina: number = 0, tamanho: number = 10): void {
    this.notaService.listarNotas(pagina, tamanho).subscribe((dados) => {
      this.notas = dados.content;
      this.pagina = dados.number;
      this.tamanhoPagina = dados.size;
      this.totalRegistros = dados.totalElements;
    });
  }

  aoPaginar(event: PageEvent): void {
    this.carregarNotas(event.pageIndex, event.pageSize);
  }
}
