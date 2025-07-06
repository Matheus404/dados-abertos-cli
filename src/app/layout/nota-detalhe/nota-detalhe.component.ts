import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotaFiscalService, NotaFiscal } from '../../services/nota-fiscal.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-nota-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ],
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './nota-detalhe.component.html',
  styleUrl: './nota-detalhe.component.css'
})
export class NotaDetalheComponent implements OnInit {
  nota!: NotaFiscal;
  colunasItens = ['descricao', 'quantidade', 'valorUnitario', 'valorTotal'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaFiscalService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.notaService.buscarNotaPorId(id).subscribe(dados => {
      this.nota = dados;
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
