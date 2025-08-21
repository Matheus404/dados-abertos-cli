import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FornecedorService } from '../../services/fornecedor.service';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-detalhe-fornecedor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './detalhe-fornecedor.component.html',
  styleUrls: ['./detalhe-fornecedor.component.css']
})
export class DetalheFornecedorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fornecedorService = inject(FornecedorService);

  fornecedor: any;
  displayedColumns: string[] = ['descricaoProdutoServico', 'unidadeMedida', 'valorUnitario'];
  itens: any[] = [];
  totalRegistros = 0;
  pageIndex = 0;
  pageSize = 10;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarFornecedor(id, this.pageIndex, this.pageSize);
  }

  carregarFornecedor(id: number, page: number, size: number): void {
    this.fornecedorService.buscarFornecedorPorId(id, page, size).subscribe({
      next: (data) => {
        this.fornecedor = data;
        this.itens = data.itensPaginados.content;
        this.totalRegistros = data.itensPaginados.totalElements;
      },
      error: (err) => console.error('Erro ao carregar fornecedor', err)
    });
  }

  onPageChange(event: PageEvent) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFornecedor(id, this.pageIndex, this.pageSize);
  }
}
