import { Component, OnInit } from '@angular/core';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';
import { MatTableDataSource } from '@angular/material/table';

import { AbastecimentoService } from 'src/app/services/abastecimento.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'bomba', 'combustivel', 'quantidadeLitros', 'valorAbastecido'];
  dataSource: MatTableDataSource<Abastecimento>;

  constructor(
    private abastecimentoService: AbastecimentoService,
    private abastecimentoLocalService: AbastecimentoService
  ) {}

  ngOnInit() {
    this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
      this.dataSource = new MatTableDataSource<Abastecimento>(abastecimentos);
    });
  }
}
