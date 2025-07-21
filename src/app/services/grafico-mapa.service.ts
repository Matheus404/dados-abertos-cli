import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface ResumoNotasPorEstadoDTO {
  uf: string;
  quantidadeNotas: number;
  valorTotalNotas: number;
  ufNome: string;
}

@Injectable({
  providedIn: 'root',
})
export class GraficoMapaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getResumoNotasPorEstado(): Observable<ResumoNotasPorEstadoDTO[]> {
    return this.http.get<ResumoNotasPorEstadoDTO[]>(
      `${this.apiUrl}/graficos/notas/uf/resumo`
    );
  }
}
