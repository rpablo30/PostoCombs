import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importe o MatSnackBar

@Component({
  selector: 'app-relatorioModal',
  templateUrl: './relatorioModal.component.html',
  styleUrls: ['./relatorioModal.component.scss']
})
export class RelatorioModalComponent {
  abastecimentos: Abastecimento[] = [];
  diaSelecionadoInicio: string = '';
  diaSelecionadoFim: string = '';
  tanqueSelecionado: string = '';
  formatoRelatorio: string = 'excel';
  bombaSelecionada: any = {
    Gasolina1: false,
    Gasolina2: false,
    Diesel1: false,
    Diesel2: false
  };
  maxDate: string;
  tipoTanqueSelecionado: string = '';

  constructor(
    public dialogRef: MatDialogRef<RelatorioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private abastecimentoService: AbastecimentoService,
    private snackBar: MatSnackBar
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.carregarAbastecimentos();
    this.formatoRelatorio = 'default';
  }

  carregarAbastecimentos() {
    this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
      this.abastecimentos = abastecimentos;
    });
      // Ajustando para a data inicial
      const today = new Date();
      this.diaSelecionadoInicio = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];

  }

  gerarRelatorio() {
    console.log('Formato do Relatório:', this.formatoRelatorio);
    console.log('Data Inicial:', this.diaSelecionadoInicio);
    console.log('Data Final:', this.diaSelecionadoFim);
    console.log('Tanque Selecionado:', this.tanqueSelecionado);
    console.log('Bomba Selecionada:', this.bombaSelecionada);

    if (this.formatoRelatorio === 'excel') {
      this.gerarRelatorioExcel();
    } else if (this.formatoRelatorio === 'pdf') {
      this.gerarRelatorioPDF();
    }
  }
  gerarRelatorioExcel() {
    const relatorioData = this.prepararDadosParaExcel(); // Popula a variável com os dados
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(relatorioData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');
  
    // Use "binary" como o tipo de saída
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    const blob = new Blob([this.s2ab(excelBuffer)], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.xlsx';
    a.click();
  
    this.showSuccessMessageAndCloseModal();
  }
  

  s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }


prepararDadosParaExcel(): any[] {
   
    const dadosParaExcel = this.abastecimentos.map(abastecimento => {
        return {
            Data: this.formatDate(new Date(abastecimento.data)),
            Combustível: abastecimento.combustivel,
            'Quantidade de Litros': this.formatQuantidadeLitros(abastecimento.quantidadeLitros),
            'Valor Abastecido': this.formatValorAbastecido(abastecimento.valorAbastecido)
        };
    });

    return dadosParaExcel;
}

formatQuantidadeLitros(quantidade: number | string): string {
    if (typeof quantidade === 'string') {
        quantidade = parseFloat(quantidade);
    }
    return quantidade.toFixed(2).replace('.', ',');
}

formatValorAbastecido(valor: number | string): string {
    if (typeof valor === 'string') {
        valor = parseFloat(valor.replace('R$', '').replace(',', '.').trim());
    }
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

  
  gerarRelatorioPDF() {
    const doc = new jsPDF();
    doc.setFontSize(8);

    doc.text('Relatório de Abastecimento', 10, 10);
    doc.text(`Tanque Selecionado: ${this.tanqueSelecionado}`, 10, 30);
    doc.text(`Bomba Selecionada: ${this.getSelectedBombas()}`, 10, 50);

    let linha = 60;
    const dataInicio = new Date(this.diaSelecionadoInicio);
    const dataFim = new Date(this.diaSelecionadoFim);

    const abastecimentosFiltrados = this.abastecimentos.filter((abastecimento) => {
        const dataAbastecimento = new Date(abastecimento.data);
        const timestampAbastecimento = dataAbastecimento.getTime();
        return (
            this.isBombaSelected(abastecimento.bomba) &&
            timestampAbastecimento >= dataInicio.getTime() &&
            timestampAbastecimento <= dataFim.getTime()
        );
    });

    abastecimentosFiltrados.sort((a, b) => {
        const dataA = new Date(a.data).getTime();
        const dataB = new Date(b.data).getTime();
        return dataA - dataB;
    });

    let totalValorAbastecido = 0;

    abastecimentosFiltrados.forEach((abastecimento) => {
        const dataAbastecimento = new Date(abastecimento.data);
        doc.text(`Data: ${this.formatDate(dataAbastecimento)}`, 10, linha);
        doc.text(`Combustível: ${abastecimento.combustivel}`, 50, linha);

        const quantidadeLitros = typeof abastecimento.quantidadeLitros === 'string' ? parseFloat(abastecimento.quantidadeLitros) : abastecimento.quantidadeLitros;
        const quantidadeLitrosFormatada = quantidadeLitros.toFixed(2).replace('.', ',');
        doc.text(`Quantidade de Litros: ${quantidadeLitrosFormatada}`, 100, linha);

        const valorAbastecido = typeof abastecimento.valorAbastecido === 'string' ? parseFloat(abastecimento.valorAbastecido.replace('R$', '').replace(',', '.').trim()) : abastecimento.valorAbastecido;
        const valorAbastecidoFormatado = valorAbastecido.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        doc.text(`Valor Abastecido: R$ ${valorAbastecidoFormatado}`, 150, linha);

        linha += 10;

        totalValorAbastecido += valorAbastecido;
    });

    const somaFormatada = totalValorAbastecido.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    doc.setLineWidth(0.5);
    doc.line(10, linha, 200, linha);

    doc.setFontSize(20);
    linha += 10;
    doc.text(`Soma: R$ ${somaFormatada}`, 10, linha);

    doc.save('relatorio.pdf');
    this.showSuccessMessageAndCloseModal();
}


  
  
  formatDate(date: Date): string {
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onTipoCombustivelChange() {
    console.log('Seleção de combustível alterada:', this.tanqueSelecionado);
    if (this.tanqueSelecionado === 'Gasolina') {
      this.tipoTanqueSelecionado = 'GasolinaTanque';
    } else if (this.tanqueSelecionado === 'Diesel') {
      this.tipoTanqueSelecionado = 'DieselTanque';
    } else if (this.tanqueSelecionado === 'GasolinaDiesel') {
      this.tipoTanqueSelecionado = 'GasolinaDieselTanque';
    } else {
      this.tipoTanqueSelecionado = '';
    }
  }

  fecharModal() {
    this.dialogRef.close();
  }

  resetModalFields() {
    this.diaSelecionadoInicio = '';
    this.diaSelecionadoFim = '';
    this.tanqueSelecionado = '';
    this.bombaSelecionada = {
      Gasolina1: false,
      Gasolina2: false,
      Diesel1: false,
      Diesel2: false
    };
    this.formatoRelatorio = 'default';
  }

  private isBombaSelected(bomba: string) {
    const bombaKey = this.getBombaKey(bomba);
    return this.bombaSelecionada[bombaKey];
  }

  private getBombaKey(bomba: string) {
    switch (bomba) {
      case 'Bomba 1':
        return 'Gasolina1';
      case 'Bomba 2':
        return 'Gasolina2';
      case 'Bomba 3':
        return 'Diesel1';
      case 'Bomba 4':
        return 'Diesel2';
      default:
        return '';
    }
  }

  private getSelectedBombas() {
    const selectedBombas = [];
    if (this.bombaSelecionada.Gasolina1) selectedBombas.push('Bomba 1');
    if (this.bombaSelecionada.Gasolina2) selectedBombas.push('Bomba 2');
    if (this.bombaSelecionada.Diesel1) selectedBombas.push('Bomba 3');
    if (this.bombaSelecionada.Diesel2) selectedBombas.push('Bomba 4');
    return selectedBombas.join(', ');
  }

  private showSuccessMessageAndCloseModal() {
    this.snackBar.open('Relatório salvo com sucesso!', 'Fechar', {
      duration: 3000
    });
    this.dialogRef.close();
  }
}
