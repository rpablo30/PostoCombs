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

  constructor(
    public dialogRef: MatDialogRef<RelatorioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  gerarRelatorio() {
    // Aqui você pode gerar o relatório com base nas seleções feitas
    // Utilize this.diaSelecionado, this.tanqueSelecionado e this.bombaSelecionada
  }

  confirmarSelecoes() {
    // Fecha o modal e envia as seleções de volta para a página anterior
    this.dialogRef.close({
      diaSelecionado: this.diaSelecionado,
      tanqueSelecionado: this.tanqueSelecionado,
      bombaSelecionada: this.bombaSelecionada
    });
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
