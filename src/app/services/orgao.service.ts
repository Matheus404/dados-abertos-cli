import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orgao } from '../models/orgao.model';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../models/PaginatedResponse.model';

@Injectable({
  providedIn: 'root',
})
export class OrgaoService {
  private apiUrl = `${environment.apiUrl}/orgaos`;

  constructor(private http: HttpClient) {}

  listarOrgaos(
    page: number,
    size: number,
    filtros?: { nome?: string; cnpj?: string; uf?: string }
  ): Observable<PaginatedResponse<Orgao>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filtros) {
      if (filtros.nome) params = params.set('nome', filtros.nome);
      if (filtros.cnpj) params = params.set('cnpj', filtros.cnpj);
      if (filtros.uf) params = params.set('uf', filtros.uf);
    }

    return this.http.get<PaginatedResponse<Orgao>>(this.apiUrl, { params });
  }

  buscarOrgaoPorId(id: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      params: { page, size },
    });
  }
}
