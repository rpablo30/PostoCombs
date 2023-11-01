import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private usuarioAutenticado: boolean = false;

  login(username: string, password: string): boolean {
    console.log('Tentando autenticar com:', username, password);

    if (username === 'teste' && password === '123') {
      this.usuarioAutenticado = true;
      console.log('Autenticado com sucesso.');
      return true;
    } else {
      this.usuarioAutenticado = false;
      console.log('Falha na autenticação.');
      return false;
    }
  }

  fazerLogout(): void {
    this.usuarioAutenticado = false;
  }

  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }
}
