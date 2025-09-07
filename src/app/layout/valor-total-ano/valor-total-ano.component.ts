import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-valor-total-ano',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './valor-total-ano.component.html',
  styleUrls: ['./valor-total-ano.component.css']
})
export class ValorTotalAnoComponent implements OnInit {
  anosDisponiveis = [2023, 2024, 2025];
  anoSelecionado = 2025;
  valorTotal: number = 0;
  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarValorTotal();
  }

  carregarValorTotal() {
    this.loading = true;
    this.dashboardService.getValorTotalAno(this.anoSelecionado).subscribe({
      next: (res) => {
        this.valorTotal = res.valorTotalNfAno;
        console.log('[valor-total-ano] resposta', res);
        this.loading = false;
      },
      error: (err) => {
        console.error('[valor-total-ano] erro', err);
        this.loading = false;
      }
    });
  }
}
