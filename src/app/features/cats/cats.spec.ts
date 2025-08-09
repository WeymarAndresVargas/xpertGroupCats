import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Cats } from './cats';
import { CatsService } from '../../services/cats.service';
import { ICatBreed } from '../../intefaces/catBreed';
import { IBreedImage } from '../../intefaces/breedImage';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { Select } from 'primeng/select';
import { GalleriaModule } from 'primeng/galleria';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe( 'Cats Component', () => {
  let component: Cats;
  let fixture: ComponentFixture<Cats>;
  let catsService: jasmine.SpyObj<CatsService>;

  const mockCatBreeds: ICatBreed[] = [
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
    }, {
      id: 'beng',
      name: 'Bengal',
      temperament: 'Alert, Agile, Energetic',
      origin: 'United States',
      description: 'Bengals are a lot of fun to live with',
      life_span: '12 - 16',
      adaptability: 3,
      intelligence: 4,
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

  const mockCatImages: IBreedImage[] = [
    { id: 'img1', url: 'http://example.com/cat1.jpg', width: 500, height: 400 },
    { id: 'img2', url: 'http://example.com/cat2.jpg', width: 600, height: 500 }
  ];

  beforeEach( async () => {
    const catsServiceSpy = jasmine.createSpyObj( 'CatsService', [ 'getCatsBreeds', 'getImages' ] );
    await TestBed.configureTestingModule( {
      imports: [
        CommonModule, FormsModule, NoopAnimationsModule, CardModule, ButtonModule, ImageModule, ProgressSpinnerModule,
        TagModule, Select, GalleriaModule, Cats
      ], providers: [
        { provide: CatsService, useValue: catsServiceSpy }
      ]
    } ).compileComponents();

    catsService = TestBed.inject( CatsService ) as jasmine.SpyObj<CatsService>;
    catsService.getCatsBreeds.and.returnValue( of( mockCatBreeds ) );
    catsService.getImages.and.returnValue( of( mockCatImages ) );

    fixture = TestBed.createComponent( Cats );
    component = fixture.componentInstance;
  } );

  it( 'should create the component', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'should load cat breeds on initialization', fakeAsync( () => {
    fixture.detectChanges();
    tick();
    const breedCat = mockCatBreeds[ 0 ];
    expect( catsService.getCatsBreeds ).toHaveBeenCalled();
    expect( component[ 'listOfCats' ]() ).toEqual( mockCatBreeds );
    expect( component[ 'selectedCat' ] ).toEqual( breedCat );
    expect( catsService.getImages ).toHaveBeenCalledWith( breedCat.id );
    expect( component[ 'loading' ]() ).toBeFalse();
  } ) );


  it( 'should fetch cat images when a cat is selected', fakeAsync( () => {
    fixture.detectChanges();
    tick();
    const breedCat = mockCatBreeds[ 1 ];

    // Simulate cat selection
    component.onCatChange( { value: breedCat } );
    tick();

    expect( catsService.getImages ).toHaveBeenCalledWith( breedCat.id );
    expect( component[ 'catImages' ]() ).toEqual( mockCatImages );
  } ) );


  it( 'should return correct rating tag based on rating value', () => {
    expect( component.getRatingTag( 5 ) ).toBe( 'success' );
    expect( component.getRatingTag( 4 ) ).toBe( 'success' );
    expect( component.getRatingTag( 3 ) ).toBe( 'warning' );
    expect( component.getRatingTag( 2 ) ).toBe( 'warning' );
    expect( component.getRatingTag( 1 ) ).toBe( 'danger' );
    expect( component.getRatingTag( 0 ) ).toBe( 'danger' );
  } );
} );

