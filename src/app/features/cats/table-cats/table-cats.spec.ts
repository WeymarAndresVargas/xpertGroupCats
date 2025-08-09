import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { TableCats } from './table-cats';
import { CatsService } from '../../../services/cats.service';
import { ICatBreed } from '../../../intefaces/catBreed';
import { IBreedImage } from '../../../intefaces/breedImage';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaModule } from 'primeng/galleria';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

describe( 'TableCats Component', () => {
  let component: TableCats;
  let fixture: ComponentFixture<TableCats>;
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
      weight: { imperial: '10', metric: '10' },
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
      weight: { imperial: '10', metric: '10' },
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
        CommonModule, FormsModule, NoopAnimationsModule, TableModule, InputTextModule, ButtonModule, RatingModule,
        TagModule, TooltipModule, DialogModule, ProgressSpinnerModule, GalleriaModule, IconField, InputIcon, TableCats
      ], providers: [
        { provide: CatsService, useValue: catsServiceSpy }
      ]
    } ).compileComponents();

    catsService = TestBed.inject( CatsService ) as jasmine.SpyObj<CatsService>;
    catsService.getCatsBreeds.and.returnValue( of( mockCatBreeds ) );
    catsService.getImages.and.returnValue( of( mockCatImages ) );

    fixture = TestBed.createComponent( TableCats );
    component = fixture.componentInstance;
  } );

  it( 'should create the component', () => {
    expect( component ).toBeTruthy();
  } );

  it( 'should load cat breeds on initialization', fakeAsync( () => {
    fixture.detectChanges();
    tick();

    expect( catsService.getCatsBreeds ).toHaveBeenCalled();
    expect( component[ 'catBreeds' ]() ).toEqual( mockCatBreeds );
    expect( component[ 'loading' ]() ).toBeFalse();
  } ) );

  it( 'should handle error when loading cat breeds', fakeAsync( () => {
    const error = new Error( 'Error loading cat breeds' );
    catsService.getCatsBreeds.and.returnValue( throwError( () => error ) );
    spyOn( console, 'error' );

    fixture.detectChanges();
    tick();

    expect( catsService.getCatsBreeds ).toHaveBeenCalled();
    expect( console.error ).toHaveBeenCalledWith( 'Error fetching cat breeds:', error );
    expect( component[ 'loading' ]() ).toBeFalse();
  } ) );

  it( 'should apply global filter when search input changes', () => {
    fixture.detectChanges();

    const mockTable = { filterGlobal: jasmine.createSpy( 'filterGlobal' ) };
    component[ 'table' ] = mockTable as any;

    const mockEvent = { target: { value: 'searchText' } } as unknown as Event;

    component.onGlobalFilter( mockEvent );

    expect( mockTable.filterGlobal ).toHaveBeenCalledWith( 'searchText', 'contains' );
  } );

  it( 'should show details dialog when a cat is selected', fakeAsync( () => {
    fixture.detectChanges();
    tick();

    spyOn( component, 'fetchCatImages' ).and.callThrough();

    component.viewDetails( mockCatBreeds[ 0 ] );

    expect( component[ 'selectedCat' ] ).toEqual( mockCatBreeds[ 0 ] );
    expect( component[ 'displayDialog' ] ).toBeTrue();
    expect( component.fetchCatImages ).toHaveBeenCalledWith( mockCatBreeds[ 0 ].id );
  } ) );

  it( 'should load images when fetchCatImages is called', fakeAsync( () => {
    component.fetchCatImages( 'abys' );
    tick();

    expect( catsService.getImages ).toHaveBeenCalledWith( 'abys' );
    expect( component[ 'catImages' ]() ).toEqual( mockCatImages );
    expect( component[ 'dialogLoading' ] ).toBeFalse();
  } ) );

  it( 'should handle error when loading cat images', fakeAsync( () => {
    const error = new Error( 'Error loading cat images' );
    catsService.getImages.and.returnValue( throwError( () => error ) );

    spyOn( console, 'error' );

    component.fetchCatImages( 'abys' );
    tick();

    expect( catsService.getImages ).toHaveBeenCalledWith( 'abys' );
    expect( console.error ).toHaveBeenCalledWith( 'Error fetching cat images:', error );
    expect( component[ 'catImages' ]() ).toEqual( [] );
    expect( component[ 'dialogLoading' ] ).toBeFalse();
  } ) );

  it( 'should close dialog and reset data when closeDialog is called', () => {
    component[ 'displayDialog' ] = true;
    component[ 'selectedCat' ] = mockCatBreeds[ 0 ];
    component[ 'catImages' ].set( mockCatImages );

    component.closeDialog();

    expect( component[ 'displayDialog' ] ).toBeFalse();
    expect( component[ 'selectedCat' ] ).toBeNull();
    expect( component[ 'catImages' ]() ).toEqual( [] );
  } );

  it( 'should return correct rating tag based on rating value', () => {
    expect( component.getRatingTag( 5 ) ).toBe( 'success' );
    expect( component.getRatingTag( 4 ) ).toBe( 'success' );
    expect( component.getRatingTag( 3 ) ).toBe( 'warning' );
    expect( component.getRatingTag( 2 ) ).toBe( 'warning' );
    expect( component.getRatingTag( 1 ) ).toBe( 'danger' );
    expect( component.getRatingTag( 0 ) ).toBe( 'danger' );
  } );
} );

