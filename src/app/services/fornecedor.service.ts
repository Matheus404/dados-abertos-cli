import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../models/PaginatedResponse.model';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private apiUrl = `${environment.apiUrl}/fornecedores`;

  constructor(private http: HttpClient) {}

  listarFornecedores(
    page: number,
    size: number,
    filtros?: { cpfOuCnpj?: string; razaoSocial?: string; mei?: boolean }
  ): Observable<PaginatedResponse<Fornecedor>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filtros) {
      if (filtros.cpfOuCnpj)
        params = params.set('cpfOuCnpj', filtros.cpfOuCnpj);
      if (filtros.razaoSocial)
        params = params.set('razaoSocial', filtros.razaoSocial);
      if (typeof filtros.mei === 'boolean')
        params = params.set('mei', String(filtros.mei));
    }

    return this.http.get<PaginatedResponse<Fornecedor>>(this.apiUrl, {
      params,
    });
  }

  buscarFornecedorPorId(
    id: number,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/fornecedores/${id}`, {
      params: { page, size },
    });
  }
}
