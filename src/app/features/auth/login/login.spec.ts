import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Login } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IUser } from '../../../intefaces/user';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';

describe( 'Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach( () => {
    authServiceSpy = jasmine.createSpyObj( 'AuthService', [ 'login' ] );
    routerSpy = jasmine.createSpyObj( 'Router', [ 'navigate' ] );

    TestBed.configureTestingModule( {
      imports: [
        ReactiveFormsModule, Login
      ], providers: [
        provideAnimationsAsync(), provideAnimations(), { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ], schemas: [ NO_ERRORS_SCHEMA ]
    } );
    fixture = TestBed.createComponent( Login );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create the component', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'should initialize form with empty fields', () => {
    expect( component.loginForm ).toBeDefined();
    expect( component.email?.value ).toBe( '' );
    expect( component.password?.value ).toBe( '' );
    expect( component.loginForm.valid ).toBeFalsy();
  } );

  it( 'should validate email format', () => {
    const emailControl = component.loginForm.get( 'email' );

    emailControl?.setValue( 'invalidemail' );
    expect( emailControl?.valid ).toBeFalsy();
    expect( emailControl?.hasError( 'email' ) ).toBeTruthy();

    emailControl?.setValue( 'valid@example.com' );
    expect( emailControl?.valid ).toBeTruthy();
  } );

  it( 'should validate password length', () => {
    const passwordControl = component.loginForm.get( 'password' );

    passwordControl?.setValue( '12345' );
    expect( passwordControl?.valid ).toBeFalsy();
    expect( passwordControl?.hasError( 'minlength' ) ).toBeTruthy();

    passwordControl?.setValue( '123456' );
    expect( passwordControl?.valid ).toBeTruthy();
  } );

  it( 'should not submit when form is invalid', () => {
    component.onSubmit();
    expect( component.email?.touched ).toBeTruthy();
    expect( component.password?.touched ).toBeTruthy();
    expect( authServiceSpy.login ).not.toHaveBeenCalled();
  } );

  it( 'should show loading state during submission', fakeAsync( () => {
    component.loginForm.setValue( {
      email: 'test@example.com', password: 'password123'
    } );
    authServiceSpy.login.and.returnValue( of( { user: null } ) );
    component.onSubmit();
    expect( component.isSubmitting ).toBeTruthy();
    tick( 1500 );
    expect( authServiceSpy.login ).toHaveBeenCalledWith( 'test@example.com', 'password123' );
  } ) );

  it( 'should navigate to /cats on successful login 1111--------', fakeAsync( () => {
    const user: IUser = { name: 'Test User', email: 'test@example.com', token: 'token123' };
    component.loginForm.setValue( {
      email: 'test@example.com', password: 'password123'
    } );
    spyOn( component.messageService, 'add' ).and.callThrough();
    authServiceSpy.login.and.returnValue( of( { user } ) );
    component.onSubmit();
    tick( 1200 );
    expect( component.messageService.add ).toHaveBeenCalledWith( {
      severity: 'success', summary: 'Login Exitoso', detail: '¡Bienvenido a Cat Breeds App!'
    } );
    expect( routerSpy.navigate ).toHaveBeenCalledWith( [ '/cats' ] );
    expect( component.isSubmitting ).toBeFalsy();
  } ) );

  it( 'should show error message when login response has no user', fakeAsync( () => {
    component.loginForm.setValue( {
      email: 'test@example.com', password: 'password123'
    } );
    spyOn( component.messageService, 'add' ).and.callThrough();
    authServiceSpy.login.and.returnValue( of( { user: null } ) );
    component.onSubmit();
    tick( 1200 );
    expect( component.messageService.add ).toHaveBeenCalledWith( {
      severity: 'error', summary: 'Error de Login', detail: 'Credenciales incorrectas. Intente nuevamente.'
    } );
    expect( routerSpy.navigate ).not.toHaveBeenCalled();
    expect( component.isSubmitting ).toBeFalsy();
  } ) );

  it( 'should show error message when login throws an error', fakeAsync( () => {
    component.loginForm.setValue( {
      email: 'test@example.com', password: 'password123'
    } );
    spyOn( component.messageService, 'add' ).and.callThrough();
    authServiceSpy.login.and.returnValue( throwError( () => new Error( 'Authentication failed' ) ) );
    component.onSubmit();
    tick( 1200 );
    expect( component.messageService.add ).toHaveBeenCalledWith( {
      severity: 'error', summary: 'Error de Login', detail: 'Credenciales incorrectas. Intente nuevamente.'
    } );
    expect( routerSpy.navigate ).not.toHaveBeenCalled();
    expect( component.isSubmitting ).toBeFalsy();
  } ) );
} );
