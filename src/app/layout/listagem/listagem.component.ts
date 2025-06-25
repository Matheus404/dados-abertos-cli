import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
  dataSource = this.notas;
  totalPaginas: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private notaService: NotaFiscalService) {}

  ngOnInit(): void {
    this.carregarNotas();
  }

  carregarNotas(pagina: number = 0) {
    this.notaService.listarNotas(pagina).subscribe((dados) => {
      this.notas = dados.content;
      this.dataSource = this.notas;
      this.paginator.pageIndex = pagina;
    });
  }

    proximaPagina() {
    if (this.paginator.pageIndex + 1 < this.paginator.getNumberOfPages()) {
      this.carregarNotas(this.paginator.pageIndex + 1);
    }
  }

  paginaAnterior() {
    if (this.paginator.pageIndex > 0) {
      this.carregarNotas(this.paginator.pageIndex - 1);
    }
  }
  
}
