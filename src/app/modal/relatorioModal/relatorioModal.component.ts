import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';

@Component({
  selector: 'app-relatorioModal',
  templateUrl: './relatorioModal.component.html',
  styleUrls: ['./relatorioModal.component.scss']
})
export class RelatorioModalComponent {
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
    private abastecimentoService: AbastecimentoService
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  gerarRelatorio() {
    console.log('Formato do Relatório:', this.formatoRelatorio);
    console.log('Data Inicial:', this.diaSelecionadoInicio);
    console.log('Data Final:', this.diaSelecionadoFim);
    console.log('Tanque Selecionado:', this.tanqueSelecionado);
    console.log('Bomba Selecionada:', this.bombaSelecionada);
    
    if (this.formatoRelatorio === 'excel') {

    } else if (this.formatoRelatorio === 'pdf') {
      
    }
  }
  onTipoCombustivelChange() {
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
}
