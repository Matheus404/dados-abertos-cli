import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService, ResumoRegistrosDTO } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {
  resumo?: ResumoRegistrosDTO;
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getResumoRegistros().subscribe({
      next: (data) => {
        this.resumo = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
