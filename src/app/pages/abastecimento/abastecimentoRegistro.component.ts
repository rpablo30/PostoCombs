import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbastecimentoModalComponent } from 'src/app/modal/abastecimentoModal/abastecimentoModal.component';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';


declare var $: any;

@Component({
  selector: 'app-abastecimentoRegistro',
  templateUrl: './abastecimentoRegistro.component.html',
  styleUrls: ['./abastecimentoRegistro.component.scss']
})
export class AbastecimentoRegistroComponent implements OnInit {
  abastecimentos: Abastecimento[] = [];
  selectedBombaId: string; 
  dialogRef: MatDialogRef<AbastecimentoModalComponent> | null; 
  tipoCombustivel: string = ''; 
  

  constructor(public dialog: MatDialog,private abastecimentoService: AbastecimentoService, private el: ElementRef) {}

  ngOnInit() {
   
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openModal(bombaId: string) {
    console.log('Abrindo modal');
  
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  
    let tipoCombustivel = '';
  
    if (bombaId === 'Bomba 1' || bombaId === 'Bomba 2') {
      tipoCombustivel = 'Gasolina';
    } else if (bombaId === 'Bomba 3' || bombaId === 'Bomba 4') {
      tipoCombustivel = 'Diesel';
    }

    this.selectedBombaId = bombaId; 
    this.tipoCombustivel = (bombaId === 'Bomba 1' || bombaId === 'Bomba 2') ? 'Gasolina' : 'Diesel'; // Atualize o tipo de combustível
  
    this.dialogRef = this.dialog.open(AbastecimentoModalComponent, {
      width: '1400px',
      data: { bombaSelecionada: bombaId, tipoCombustivel: tipoCombustivel },
    });
  
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  
  
  
}
