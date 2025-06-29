import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotaFiscalService, NotaFiscal } from '../../services/nota-fiscal.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-nota-detalhe',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './nota-detalhe.component.html',
  styleUrl: './nota-detalhe.component.css'
})
export class NotaDetalheComponent implements OnInit {
  nota!: NotaFiscal;

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaFiscalService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.notaService.buscarNotaPorId(id).subscribe(dados => {
      this.nota = dados;
    });
  }

}
