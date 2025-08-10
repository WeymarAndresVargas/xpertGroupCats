import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthStore } from '../core/state/auth.state';


describe( 'AuthService', () => {
  let service: AuthService;
  let authStoreMock: jasmine.SpyObj<any>;

  beforeEach( () => {
    // Crear un mock para AuthStore
    authStoreMock = jasmine.createSpyObj( 'AuthStore', [ 'isAuthenticated', 'user', 'login', 'logout' ] );

    TestBed.configureTestingModule( {
      providers: [
        AuthService, { provide: AuthStore, useValue: authStoreMock }
      ]
    } );

    service = TestBed.inject( AuthService );
  } );

  it( 'should be created', () => {
    expect( service ).toBeTruthy();
  } );

  it( 'should check if user is authenticated', () => {
    authStoreMock.isAuthenticated.and.returnValue( true );
    expect( service.isAuthenticated() ).toBe( true );
    expect( authStoreMock.isAuthenticated ).toHaveBeenCalled();
    authStoreMock.isAuthenticated.and.returnValue( false );
    expect( service.isAuthenticated() ).toBe( false );
  } );

  it( 'should get current user', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', token: 'token123' };
    authStoreMock.user.and.returnValue( mockUser );
    expect( service.getCurrentUser() ).toEqual( mockUser );
    expect( authStoreMock.user ).toHaveBeenCalled();
    authStoreMock.user.and.returnValue( null );
    expect( service.getCurrentUser() ).toBeNull();
  } );

  it( 'should logout user', () => {
    service.logout();
    expect( authStoreMock.logout ).toHaveBeenCalled();
  } );

  describe( 'login', () => {
    it( 'should login successfully with correct credentials', ( done ) => {
      const email = 'correo@correo.com';
      const password = 'Admin123';
      const expectedUser = {
        name: 'Usuario 1', token: '$2a$12$t.zFGlMUUrWMnqXnJt2gbOnGHRMmNaB81BvCbtFkuiZ.26QB7PYS2', email: email
      };
      service.login( email, password ).subscribe( result => {
        expect( result ).toEqual( { user: expectedUser } );
        expect( authStoreMock.login ).toHaveBeenCalledWith( expectedUser );
        done();
      } );
    } );

    it( 'should return null with incorrect credentials', ( done ) => {
      const email = 'wrong@example.com';
      const password = 'wrongpass';
      service.login( email, password ).subscribe( result => {
        expect( result ).toEqual( { user: null } );
        expect( authStoreMock.login ).not.toHaveBeenCalled();
        done();
      } );
    } );
  } );
} );
