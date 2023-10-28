import { Component, OnInit, ViewChild } from '@angular/core';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Importe o MatPaginator

import { AbastecimentoService } from 'src/app/services/abastecimento.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ['id','quantidadeLitros','valorAbastecido','bomba','combustivel','data'];
  dataSource: MatTableDataSource<Abastecimento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private abastecimentoService: AbastecimentoService,
    private abastecimentoLocalService: AbastecimentoService
  ) {}

  ngOnInit() {
    this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
      this.dataSource = new MatTableDataSource<Abastecimento>(abastecimentos);
      this.dataSource.paginator = this.paginator;
    });
  }
}
