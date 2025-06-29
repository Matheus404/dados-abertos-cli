import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  NotaFiscalService,
  NotaFiscal,
} from '../../services/nota-fiscal.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
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

  filtros = {
    cpgfOuCnpjFornecedor: '',
    cnpjOrgao: '',
    nomeOrgao: '',
    razaoSocial: '',
    numero: null,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private notaService: NotaFiscalService) {}

  ngOnInit(): void {
    this.carregarNotas();
  }

  carregarNotas(pagina: number = 0, tamanho: number = 10): void {
    this.notaService
      .listarNotas(pagina, tamanho, this.filtros)
      .subscribe((dados) => {
        this.notas = dados.content;
        this.pagina = dados.number;
        this.tamanhoPagina = dados.size;
        this.totalRegistros = dados.totalElements;
      });
  }

  aoPaginar(event: PageEvent): void {
    this.carregarNotas(event.pageIndex, event.pageSize);
  }

  aplicarFiltros(): void {
    this.pagina = 0;
    this.paginator.firstPage();
    this.carregarNotas();
  }

  limparFiltros(): void {
    this.filtros = {
      cpgfOuCnpjFornecedor: '',
      cnpjOrgao: '',
      nomeOrgao: '',
      razaoSocial: '',
      numero: null,
    };
    this.aplicarFiltros();
  }
}
