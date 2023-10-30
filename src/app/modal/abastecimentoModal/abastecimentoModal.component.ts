import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-abastecimento-modal',
  templateUrl: './abastecimentoModal.component.html',
  styleUrls: ['./abastecimentoModal.component.scss']
})
export class AbastecimentoModalComponent {
  novoAbastecimento: any = {};
  bombaSelecionada: string = '';
  tipoCombustivel: string = '';

  precoGasolina: number = 5.74;
  precoDiesel: number = 6.10;

  valorImpostoPago: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AbastecimentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private abastecimentoService: AbastecimentoService,
    private snackBar: MatSnackBar
  ) {
    this.bombaSelecionada = data.bombaSelecionada; 
    this.tipoCombustivel = data.tipoCombustivel;
  }

  ngOnInit() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();
    this.novoAbastecimento.data = `${ano}-${mes}-${dia}`;
  }

  calcularImposto() {
    const valorAbastecido = parseFloat(this.novoAbastecimento.valorAbastecido);
    
    if (!isNaN(valorAbastecido)) {
      const taxaImposto = 0.13;
      const imposto = valorAbastecido * taxaImposto;
      
      this.novoAbastecimento.imposto = imposto;
    }
  }
  
  
  abrirModal(bomba: string) {
    this.bombaSelecionada = bomba;
  }

  incluirAbastecimento() {

    this.novoAbastecimento.bomba = this.bombaSelecionada;
    this.novoAbastecimento = {};
  }

  calcularQuantidadeLitros() {
    const valorAbastecido = parseFloat(this.novoAbastecimento.valorAbastecido);
    
    if (!isNaN(valorAbastecido) && valorAbastecido > 0) {
      if (this.tipoCombustivel === 'Gasolina') {
        this.novoAbastecimento.quantidadeLitros = (valorAbastecido / this.precoGasolina).toFixed(2);
      } else if (this.tipoCombustivel === 'Diesel') {
        this.novoAbastecimento.quantidadeLitros = (valorAbastecido / this.precoDiesel).toFixed(2);
      }
    } else {
      this.novoAbastecimento.quantidadeLitros = null;
    }
  }
  
  


  formatarMoeda() {
    if (this.novoAbastecimento.valorAbastecido) {
      this.novoAbastecimento.valorAbastecido = parseFloat(this.novoAbastecimento.valorAbastecido)
        .toFixed(2)
        .replace('.', ','); 
      this.novoAbastecimento.valorAbastecido = 'R$ ' + this.novoAbastecimento.valorAbastecido;
    }
  }

  mostrarMensagemDeSucesso(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000, 
      verticalPosition: 'top', 
    });
  }

    
  onConfirmarAbastecimentoClick() {
    this.novoAbastecimento.imposto = this.calcularImposto(); 
    this.novoAbastecimento.bomba = this.bombaSelecionada; 
    this.novoAbastecimento.combustivel = this.tipoCombustivel;
    console.log('Botão de Confirmar Abastecimento clicado.');
  
    
    this.abastecimentoService.adicionarAbastecimentoNoServidor(this.novoAbastecimento)
    .subscribe(
      (response) => {
        console.log('Abastecimento adicionado com sucesso:', response);
        
        this.fecharModal();
        
        this.mostrarMensagemDeSucesso('Abastecimento Autorizado.');
  
          this.novoAbastecimento = {};
        },
        (error) => {
          console.error('Erro ao adicionar abastecimento:', error);
        }
      );
  }

  
  

  onImpostoChange() {
    this.novoAbastecimento.imposto = this.valorImpostoPago;
  }


  fecharModal() {
    this.dialogRef.close();
  }
}
