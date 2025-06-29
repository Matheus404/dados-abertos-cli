import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface NotaFiscal {
  id: number;
  numero: number;
  dataEmissao: string;
  cpgfOuCnpjFornecedor: string;
  cnpjOrgao: string;
  valorNotaFiscal: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotaFiscalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/notas-fiscais`;

  listarNotas(
    pagina = 0,
    tamanho = 10,
    filtros: any = {}
  ): Observable<PaginatedResponse<NotaFiscal>> {
    let params = new HttpParams().set('page', pagina).set('size', tamanho);

    Object.keys(filtros).forEach((chave) => {
      const valor = filtros[chave];
      if (valor !== null && valor !== undefined && valor !== '') {
        params = params.set(chave, valor);
      }
    });

    return this.http.get<PaginatedResponse<NotaFiscal>>(this.apiUrl, {
      params,
    });
  }
}
