import { Component, OnInit } from '@angular/core';
import { Abastecimento } from 'src/app/model/Abastecimeto.model';

import { AbastecimentoService } from 'src/app/services/abastecimento.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'bomba', 'combustivel', 'quantidadeLitros', 'valorAbastecido'];
  dataSource: Abastecimento[] = [];

  constructor(
    private abastecimentoService: AbastecimentoService,
    private abastecimentoLocalService: AbastecimentoService // Importe o serviço local se necessário
  ) {}

  ngOnInit() {
    // Use this line to load data from a remote API
    this.abastecimentoService.getAbastecimentos().subscribe((data) => {
      this.dataSource = data;
    });

    // Use this line if you want to load data from the local file (db.json)
    // this.abastecimentoLocalService.getAbastecimentos().subscribe((data) => {
    //   this.dataSource = data.abastecimentos;
    // });
  }
}
