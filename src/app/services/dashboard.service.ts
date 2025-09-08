import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ResumoRegistrosDTO {
  quantidadeOrgaos: number;
  quantidadeFornecedores: number;
  quantidadeNotasFiscais: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getResumoRegistros(): Observable<ResumoRegistrosDTO> {
    return this.http.get<ResumoRegistrosDTO>(
      `${this.apiUrl}/graficos/contar/registros/resumo`
    );
  }

  getValorTotalAno(ano: number): Observable<{ valorTotalNfAno: number }> {
    return this.http.get<{ valorTotalNfAno: number }>(
      `${this.apiUrl}/notas-fiscais/valor-total-ano?ano=${ano}`
    );
  }
}
