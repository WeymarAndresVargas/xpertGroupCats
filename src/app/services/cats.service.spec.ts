import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CatsService } from './cats.service';
import { ICatBreed } from '../intefaces/catBreed';
import { IBreedImage } from '../intefaces/breedImage';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe( 'CatsService', () => {
  let service: CatsService;
  let httpMock: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule( { providers: [
         provideHttpClient(), provideHttpClientTesting()
      ]
    } );
    service = TestBed.inject( CatsService );
    httpMock = TestBed.inject( HttpTestingController );
  } );

  afterEach( () => {
    httpMock.verify();
  } );

  it( 'should be created', () => {
    expect( service ).toBeTruthy();
  } );

  it( 'should retrieve cat breeds from the API', () => {
    const mockCats: ICatBreed[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        temperament: 'Active, Energetic, Independent',
        origin: 'Egypt',
        description: 'The Abyssinian is easy to care for',
        life_span: '14 - 15',
        adaptability: 5,
        intelligence: 5,
        weight: {
          imperial: '10', metric: '10',
        },
        country_codes: '',
        country_code: '',
        indoor: 0,
        affection_level: 0,
        child_friendly: 0,
        dog_friendly: 0,
        energy_level: 0,
        grooming: 0,
        health_issues: 0,
        shedding_level: 0,
        social_needs: 0,
        stranger_friendly: 0,
        vocalisation: 0,
        experimental: 0,
        hairless: 0,
        natural: 0,
        rare: 0,
        rex: 0,
        suppressed_tail: 0,
        short_legs: 0,
        hypoallergenic: 0
      }
    ];

    service.getCatsBreeds().subscribe( cats => {
      expect( cats ).toEqual( mockCats );
      expect( cats.length ).toBe( 1 );
      expect( cats[ 0 ].id ).toBe( 'abys' );
    } );

    const req = httpMock.expectOne( `${ environment.apiUrl }breeds` );
    expect( req.request.method ).toBe( 'GET' );
    req.flush( mockCats );
  } );


  it( 'should retrieve images for a specific breed', () => {
    const breedId = 'abys';
    const mockImages: IBreedImage[] = [
      { id: 'img1', url: 'http://example.com/cat1.jpg', width: 500, height: 400 },
      { id: 'img2', url: 'http://example.com/cat2.jpg', width: 600, height: 500 }
    ];

    service.getImages( breedId ).subscribe( images => {
      expect( images ).toEqual( mockImages );
      expect( images.length ).toBe( 2 );
    } );

    const req = httpMock.expectOne( `${ environment.apiUrl }images/search?breed_id=${ breedId }&limit=10` );
    expect( req.request.method ).toBe( 'GET' );
    req.flush( mockImages );
  } );

  it( 'should handle errors when fetching cat breeds', () => {
    service.getCatsBreeds().subscribe( {
      next: () => fail( 'Expected error, but got cats' ), error: error => {
        expect( error.status ).toBe( 500 );
      }
    } );
    const req = httpMock.expectOne( `${ environment.apiUrl }breeds` );
    req.flush( 'Error fetching cat breeds', { status: 500, statusText: 'Server Error' } );
  } );

  it( 'should handle errors when fetching cat images', () => {
    const breedId = 'abys';
    service.getImages( breedId ).subscribe( {
      next: () => fail( 'Expected error, but got images' ), error: error => {
        expect( error.status ).toBe( 500 );
      }
    } );
    const req = httpMock.expectOne( `${ environment.apiUrl }images/search?breed_id=${ breedId }&limit=10` );
    req.flush( 'Error fetching cat images', { status: 500, statusText: 'Server Error' } );
  } );
} );
