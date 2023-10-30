import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { RelatorioModalComponent } from 'src/app/modal/relatorioModal/relatorioModal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'quantidadeLitros', 'valorAbastecido', 'bomba', 'combustivel', 'data'];
  dataSource: MatTableDataSource<Abastecimento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  abastecimentos: Abastecimento[]; 
  abastecimentosOriginais: Abastecimento[];
  selectedBomba: string = 'all';
  selectedCombustivel: string = 'all';
  showBombaSelect: boolean = false;
  @ViewChild('picker') picker: MatDatepicker<Date>;


  constructor(
    private abastecimentoService: AbastecimentoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
      this.abastecimentosOriginais = abastecimentos;
      this.abastecimentos = abastecimentos; 
      this.dataSource = new MatTableDataSource<Abastecimento>(this.abastecimentos);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDatePicker() {
    this.picker.open();
  }

  applyFilters() {
    this.filterData();
    this.dataSource = new MatTableDataSource<Abastecimento>(this.abastecimentos);
    this.dataSource.paginator = this.paginator;
  }

  filterData() {
    if (this.selectedBomba === 'all' && this.selectedCombustivel === 'all') {
      this.abastecimentos = this.abastecimentosOriginais.slice();
    } else {
      this.abastecimentos = this.abastecimentosOriginais.filter(abastecimento => {
        const filterBomba = this.selectedBomba === 'all' || abastecimento.bomba === this.selectedBomba;
        const filterCombustivel = this.selectedCombustivel === 'all' || abastecimento.combustivel === this.selectedCombustivel;
        return filterBomba && filterCombustivel;
      });
    }
  }

  
  imprimirRelatorio() {
    let tipoCombustivel = ''; 
    this.dialog.open(RelatorioModalComponent, {
      width: '400px',
      data: {
        diaSelecionado: '',
        tanqueSelecionado: '',
        bombaSelecionada: ''
      }
    });
  }
}
