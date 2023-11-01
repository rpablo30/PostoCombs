import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from './AuthService.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    
  }

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService , private router: Router) {}

  fazerLogin() {
    const autenticado = this.authService.login(this.username, this.password);
    if (autenticado) {
      this.router.navigate(['/abastecimentoRegistro']);
    } else {
    }
  }
  }
