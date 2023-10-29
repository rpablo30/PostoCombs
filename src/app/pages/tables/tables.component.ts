import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { MatDatepicker } from '@angular/material/datepicker';

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
  abastecimentosOriginais: Abastecimento[]; // Uma cópia dos dados originais
  selectedBomba: string = 'all';
  selectedCombustivel: string = 'all';
  showBombaSelect: boolean = false;
  @ViewChild('picker') picker: MatDatepicker<Date>;


  constructor(
    private abastecimentoService: AbastecimentoService
  ) {}

  ngOnInit() {
    this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
      this.abastecimentosOriginais = abastecimentos; // Manter uma cópia dos dados originais
      this.abastecimentos = abastecimentos; // Inicialmente, ambos contêm os dados originais
      this.dataSource = new MatTableDataSource<Abastecimento>(this.abastecimentos);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDatePicker() {
    this.picker.open(); // Abre o calendário quando o ícone é clicado
  }

  applyFilters() {
    this.filterData();
    this.dataSource = new MatTableDataSource<Abastecimento>(this.abastecimentos);
    this.dataSource.paginator = this.paginator;
  }

  filterData() {
    if (this.selectedBomba === 'all' && this.selectedCombustivel === 'all') {
      // Redefinir para os dados originais se todos os filtros estiverem em "all"
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
    const relatorio = this.abastecimentos.reduce((agrupado, abastecimento) => {
      const chave = `${abastecimento.data} - ${abastecimento.bomba} - ${abastecimento.combustivel}`;
      if (!agrupado[chave]) {
        agrupado[chave] = {
          dia: new Date(abastecimento.data).toLocaleDateString('pt-BR'),
          tanque: abastecimento.bomba,
          bomba: abastecimento.bomba,
          combustivel: abastecimento.combustivel,
          valorAbastecido: abastecimento.valorAbastecido
        };
      }
      return agrupado;
    }, {});
  
    const relatorioArray = Object.values(relatorio);
    console.log(relatorioArray);
  }
  


}
