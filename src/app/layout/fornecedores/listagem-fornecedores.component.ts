import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-listagem-fornecedores',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './listagem-fornecedores.component.html',
  styleUrls: ['./listagem-fornecedores.component.css']
})
export class ListagemFornecedoresComponent implements OnInit {
  private fornecedorService = inject(FornecedorService);

  displayedColumns: string[] = ['cpfOuCnpj', 'razaoSocial', 'uf', 'mei', 'acoes'];
  dataSource: Fornecedor[] = [];
  totalRegistros = 0;
  pageIndex = 0;
  pageSize = 10;

  // filtros
  filtros = {
    cpfOuCnpj: '',
    razaoSocial: '',
    mei: false
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    // Se o seu service já aceita filtros, usa assim:
    this.fornecedorService
      .listarFornecedores(this.pageIndex, this.pageSize, this.filtros)
      .subscribe({
        next: (data) => {
          this.dataSource = data.content;
          this.totalRegistros = data.totalElements;
        },
        error: (err) => console.error('Erro ao carregar fornecedores', err)
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFornecedores();
  }

  aplicarFiltros(): void {
    this.pageIndex = 0;
    if (this.paginator) this.paginator.firstPage();
    this.carregarFornecedores();
  }

  limparFiltros(): void {
    this.filtros = { cpfOuCnpj: '', razaoSocial: '', mei: false };
    this.aplicarFiltros();
  }

  visualizar(fornecedor: Fornecedor) {
    console.log('Visualizar fornecedor:', fornecedor);
    // no futuro: this.router.navigate(['/fornecedores', fornecedor.id]);
  }
}
