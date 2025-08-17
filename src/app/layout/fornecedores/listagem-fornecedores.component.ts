import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FornecedorService } from '../../services/fornecedor.service'
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-listagem-fornecedores',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule],
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.fornecedorService.listarFornecedores(this.pageIndex, this.pageSize).subscribe({
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

  visualizar(fornecedor: Fornecedor) {
    console.log('Visualizar fornecedor:', fornecedor);
    // Aqui futuramente você pode navegar para um detalhe
  }
}
