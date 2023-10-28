import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AbastecimentoService } from 'src/app/services/abastecimento.service';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';

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
}
