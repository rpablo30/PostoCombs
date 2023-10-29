import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorioModal',
  templateUrl: './relatorioModal.component.html',
  styleUrls: ['./relatorioModal.component.scss']
})
export class RelatorioModalComponent {
  diaSelecionado: string = '';
  tanqueSelecionado: string = '';
  bombaSelecionada: string = '';
  diaSelecionadoInicio: string = ''; 
  diaSelecionadoFim: string = ''; 
  tipoTanqueSelecionado: string = '';


  constructor(
    public dialogRef: MatDialogRef<RelatorioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  gerarRelatorio() {
  }

  confirmarSelecoes() {
    this.dialogRef.close({
      diaSelecionado: this.diaSelecionado,
      tanqueSelecionado: this.tanqueSelecionado,
      bombaSelecionada: this.bombaSelecionada
    });
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
