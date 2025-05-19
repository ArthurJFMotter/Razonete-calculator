import { Component } from '@angular/core';

interface Lancamento {
  id: number;
  tipo: 'Débito' | 'Crédito';
  valor: number;
  descricao?: string;
}

@Component({
  selector: 'app-razonete',
  standalone: false,
  templateUrl: './razonete.component.html',
  styleUrls: ['./razonete.component.scss']
})
export class RazoneteComponent {
  nomeConta: string = '';
  valorEntrada: number | null = null;
  descricaoEntrada: string = '';
  lancamentos: Lancamento[] = [];
  private proximoId = 1;

  isValorEntradaValido(tipo: 'Débito' | 'Crédito'): boolean {
    return this.valorEntrada != null && this.valorEntrada > 0;
  }

  adicionarLancamento(tipo: 'Débito' | 'Crédito') {
    if (this.valorEntrada != null && this.valorEntrada > 0) {
      this.lancamentos.push({
        id: this.proximoId++,
        tipo: tipo,
        valor: this.valorEntrada,
        descricao: this.descricaoEntrada.trim() || (tipo === 'Débito' ? 'Lançamento a Débito' : 'Lançamento a Crédito')
      });
      this.lancamentos.sort((a, b) => a.id - b.id);

      this.valorEntrada = null;
      this.descricaoEntrada = '';
    }
  }

  get debitos(): Lancamento[] {
    return this.lancamentos.filter(l => l.tipo === 'Débito');
  }

  get creditos(): Lancamento[] {
    return this.lancamentos.filter(l => l.tipo === 'Crédito');
  }

  get totalDebitos(): number {
    return this.debitos.reduce((sum, l) => sum + l.valor, 0);
  }

  get totalCreditos(): number {
    return this.creditos.reduce((sum, l) => sum + l.valor, 0);
  }

  get saldo(): number {
    return this.totalDebitos - this.totalCreditos;
  }

  // ---- FIX STARTS HERE ----
  get saldoAbsoluto(): number {
    return Math.abs(this.saldo);
  }
  // ---- FIX ENDS HERE ----

  get saldoTipo(): string {
    const s = this.saldo;
    if (s > 0) return 'Devedor';
    if (s < 0) return 'Credor';
    return 'Nulo';
  }
}