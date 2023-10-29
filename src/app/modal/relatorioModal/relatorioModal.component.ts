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
  diaSelecionado: string = '';
  tanqueSelecionado: string = '';
  diaSelecionadoInicio: string = ''; 
  diaSelecionadoFim: string = ''; 
  tipoTanqueSelecionado: string = '';
  abastecimentos: Abastecimento[] = [];
  bombaSelecionada: any = {
    Gasolina1: false,
    Gasolina2: false,
    Diesel1: false,
    Diesel2: false
  };
  maxDate: string;

  constructor(
    public dialogRef: MatDialogRef<RelatorioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private abastecimentoService: AbastecimentoService
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  gerarRelatorio() {
    console.log('Data Inicial:', this.diaSelecionadoInicio);
    console.log('Data Final:', this.diaSelecionadoFim);
    console.log('Tanque Selecionado:', this.tanqueSelecionado);
    console.log('Bomba Selecionada:', this.bombaSelecionada);
    
    // Obtenha a lista completa de abastecimentos
    this.abastecimentoService.getAbastecimentos().subscribe((abastecimentos: Abastecimento[]) => {
      console.log('Abastecimentos no Banco de Dados:', abastecimentos);
      
      // Aplique as seleções do modal para filtrar os abastecimentos
      const abastecimentosFiltrados = this.filtrarAbastecimentos(abastecimentos);
      
      // Exiba os abastecimentos filtrados no console
      console.log('Abastecimentos Filtrados:', abastecimentosFiltrados);
    });
}


  filtrarAbastecimentos(abastecimentos: Abastecimento[]): Abastecimento[] {

    return abastecimentos.filter((abastecimento) => {
      const dataAbastecimento = new Date(abastecimento.data);
      const dataInicial = new Date(this.diaSelecionadoInicio);
      const dataFinal = new Date(this.diaSelecionadoFim);

      if (
        (dataAbastecimento >= dataInicial && dataAbastecimento <= dataFinal) && // Filtra por data
        (this.tanqueSelecionado === abastecimento.combustivel) && // Filtra por tipo de combustível
        (this.bombaSelecionada[abastecimento.bomba]) // Filtra por bombas
      ) {
        return true;
      }

      return false;
    });
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
