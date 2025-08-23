import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { OrgaoService } from '../../services/orgao.service';
import { Orgao } from '../../models/orgao.model';

@Component({
  selector: 'app-listagem-orgaos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listagem-orgaos.component.html',
  styleUrls: ['./listagem-orgaos.component.css']
})
export class ListagemOrgaosComponent implements OnInit {
  private orgaoService = inject(OrgaoService);

  filtros = {
    cnpj: '',
    nome: '',
    uf: ''
  };

  displayedColumns: string[] = ['cnpj', 'nome', 'uf', 'acoes'];
  dataSource = new MatTableDataSource<Orgao>([]);
  totalRegistros = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit() {
    this.carregarOrgaos();
  }

  carregarOrgaos() {
    this.orgaoService.listarOrgaos(
      this.pageIndex,
      this.pageSize,
      this.filtros
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
        this.totalRegistros = res.totalElements;
      },
      error: (err) => {
        console.error('Erro ao buscar órgãos', err);
      }
    });
  }

  aplicarFiltros() {
    this.pageIndex = 0;
    this.carregarOrgaos();
  }

  limparFiltros() {
    this.filtros = { cnpj: '', nome: '', uf: '' };
    this.pageIndex = 0;
    this.carregarOrgaos();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarOrgaos();
  }

  visualizar(orgao: Orgao) {
    console.log('Visualizar órgão:', orgao);
  }
}
