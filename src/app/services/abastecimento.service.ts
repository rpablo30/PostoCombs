// Importe as bibliotecas necessárias
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Abastecimento } from '../model/Abastecimeto.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {
  private apiUrl = 'http://localhost:8080/api'; 
  constructor(private http: HttpClient) { }

  adicionarAbastecimentoNoServidor(abastecimento: Abastecimento): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(`${this.apiUrl}/abastecimento`, abastecimento);
  }

  getAbastecimentos(): Observable<Abastecimento[]> {
    return this.http.get<Abastecimento[]>(`${this.apiUrl}/listarAbastecimento`);
  }

  
  private handleError(error: any) {
    console.error('Erro:', error);
    return throwError(error);
  }

}
