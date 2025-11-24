import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnoStoreService {

  private anoSelecionadoSubject = new BehaviorSubject<number>(2025);
  anoSelecionado$ = this.anoSelecionadoSubject.asObservable();

  definirAno(ano: number): void {
    this.anoSelecionadoSubject.next(ano);
  }

  obterAno(): number {
    return this.anoSelecionadoSubject.value;
  }
}
