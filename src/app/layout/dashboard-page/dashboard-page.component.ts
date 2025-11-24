import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardsComponent } from '../dashboard-cards/dashboard-cards.component';
import { GraficoMapaComponent } from '../grafico-mapa/grafico-mapa.component';
import { ValorTotalAnoComponent } from '../valor-total-ano/valor-total-ano.component';
import { PizzaGraficoComponent } from '../pizza-grafico/pizza-grafico.component';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DashboardCardsComponent, 
    GraficoMapaComponent, 
    ValorTotalAnoComponent,
    PizzaGraficoComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
