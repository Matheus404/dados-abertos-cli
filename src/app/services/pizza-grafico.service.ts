import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PizzaGrafico } from '../../app/models/pizza-grafico';

@Injectable({
  providedIn: 'root'
})
export class GraficoFornecedorService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/graficos/fornecedores/valor-total`;

  listarPizza(ano: number): Observable<PizzaGrafico[]> {
    return this.http.get<PizzaGrafico[]>(`${this.apiUrl}?ano=${ano}`);
  }
}

