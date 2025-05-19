import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Lancamento {
  tipo: 'Débito' | 'Crédito';
  valor: number;
  descricao?: string;
}

@Component({
  selector: 'app-razonete',
  standalone: false,
  templateUrl: './razonete.component.html',
  styleUrl: './razonete.component.scss'
})
export class RazoneteComponent {
  nomeConta: string = '';
  debito: number | null = null;
  credito: number | null = null;
  descricao: string = '';
  lancamentos: Lancamento[] = [];
  dataSource = new MatTableDataSource<Lancamento>(this.lancamentos);
  displayedColumns: string[] = ['tipo', 'valor', 'descricao'];

  adicionarLancamento(tipo: 'Débito' | 'Crédito') {
    if ((tipo === 'Débito' && this.debito != null) || (tipo === 'Crédito' && this.credito != null)) {
      const valor = tipo === 'Débito' ? this.debito : this.credito;
      if (valor != null) {
        this.lancamentos.push({ tipo: tipo, valor: valor, descricao: this.descricao });
        this.dataSource = new MatTableDataSource<Lancamento>(this.lancamentos); // Refresh the table
        this.debito = null; // Reset input fields
        this.credito = null;
        this.descricao = '';
      }
    }
  }

  get saldo(): number {
    let totalDebito = this.lancamentos.filter(l => l.tipo === 'Débito').reduce((sum, l) => sum + l.valor, 0);
    let totalCredito = this.lancamentos.filter(l => l.tipo === 'Crédito').reduce((sum, l) => sum + l.valor, 0);
    return totalDebito - totalCredito;
  }
}