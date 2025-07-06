import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface NotaFiscal {
  id: number;
  chaveAcesso: string;
  modelo: string;
  serie: string;
  numero: number;
  naturezaOperacao: string;
  dataEmissao: string;
  eventoRecente: string;
  dataHoraEventoRecente: string;
  cpfOuCnpjFornecedor: string;
  cnpjOrgao: string;
  destinoOperacao: string;
  consumidorFinal: string;
  presencaComprador: string;
  valorNotaFiscal: number;
  fornecedor: {
    id: number;
    cpfOuCnpj: string;
    razaoSocial: string;
    inscricaoEstadual: string;
    uf: string;
    municipio: string;
    mei: boolean;
  };
  orgaoPublico: {
    id: number;
    cnpj: string;
    nome: string;
    uf: string;
    indicadorContribuinte: string;
  };
  itens: {
    id: number;
    chaveAcesso: string;
    numeroProduto: number;
    descricaoProdutoServico: string;
    codigoNcmSh: string;
    ncmShTipoDeProduto: string;
    cfop: string;
    quantidade: number;
    unidadeMedida: string;
    valorUnitario: number;
    valorTotal: number;
  }[];
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

  buscarNotaPorId(id: number): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.apiUrl}/${id}`);
  }
}
