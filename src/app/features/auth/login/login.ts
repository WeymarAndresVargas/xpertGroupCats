import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { AuthService } from '../../../services/auth.service';

@Component( {
  selector: 'app-login', standalone: true, imports: [
    CommonModule, ReactiveFormsModule, CardModule, InputTextModule, PasswordModule, ButtonModule, CheckboxModule,
    ToastModule, IconField, InputIcon
  ], providers: [ MessageService ], templateUrl: './login.html', styleUrl: './login.scss'
} )
export class Login implements OnInit {

  authService = inject( AuthService );
  router = inject( Router );
  messageService = inject( MessageService );
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor( private fb: FormBuilder ) {
  }

  get email() {
    return this.loginForm.get( 'email' );
  }

  get password() {
    return this.loginForm.get( 'password' );
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group( {
      email: [ 'correo@correo.com', [ Validators.required, Validators.email ] ],
      password: [ 'Admin123', [ Validators.required, Validators.minLength( 6 ) ] ],
    } );
  }

  onSubmit(): void {
    if( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    setTimeout( () => {
      this.authService.login( this.loginForm.value.email, this.loginForm.value.password ).subscribe( {
        next: ( response ) => {
          if( response.user ) {
            this.messageService.add( {
              severity: 'success', summary: 'Login Exitoso', detail: '¡Bienvenido a Cat Breeds App!'
            } );
            this.isSubmitting = false;
            this.router.navigate( [ '/cats' ] );
          } else {
            this.messageService.add( {
              severity: 'error', summary: 'Error de Login', detail: 'Credenciales incorrectas. Intente nuevamente.'
            } );
            this.isSubmitting = false;
          }

        }, error: ( error ) => {
          this.messageService.add( {
            severity: 'error', summary: 'Error de Login', detail: 'Credenciales incorrectas. Intente nuevamente.'
          } );
          this.isSubmitting = false;
        }
      } );
    }, 1200 );
  }
}
