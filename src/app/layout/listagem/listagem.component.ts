import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listagem',
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent {
  colunas = ['numero', 'emitente', 'valor'];
  dados = [
    { numero: 'NF12345', emitente: 'Empresa X', valor: 1500.00 },
    { numero: 'NF67890', emitente: 'Empresa Y', valor: 2599.99 },
    { numero: 'NF13579', emitente: 'Empresa Z', valor: 430.75 }
  ];
}
