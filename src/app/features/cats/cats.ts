import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatsService } from '../../services/cats.service';
import { ICatBreed } from '../../intefaces/catBreed';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { Select } from 'primeng/select';
import { IBreedImage } from '../../intefaces/breedImage';
import { GalleriaModule } from 'primeng/galleria';

@Component( {
  selector: 'app-cats', standalone: true, imports: [
    CommonModule, FormsModule, CardModule, ButtonModule, ImageModule, ProgressSpinnerModule, TagModule, Select,
    GalleriaModule,
  ], templateUrl: './cats.html', styleUrl: './cats.scss'
} )
export class Cats implements OnInit {

  protected listOfCats = signal<ICatBreed[]>( [] );
  protected selectedCat: ICatBreed | null = null;
  protected loading = signal<boolean>( false );
  protected catImages = signal<IBreedImage[]>( [] );

  private catsService = inject( CatsService );
  private router = inject( Router );

  ngOnInit() {
    this.getCatsBreeds();
  }


  getCatsBreeds() {
    this.loading.set( true );
    this.catsService.getCatsBreeds().subscribe( {
      next: ( cats ) => {
        this.listOfCats.set( cats );
        if( cats.length > 0 ) {
          this.selectedCat = cats[ 0 ];
          this.fetchCatImage( cats[ 0 ].id );
        }
        this.loading.set( false );
      }, error: ( err ) => {
        console.error( 'Error fetching cat breeds:', err );
        this.loading.set( false );
      }
    } );
  }

  onCatChange( event: any ) {
    const selectedCat = event.value;
    if( selectedCat && selectedCat.id ) {
      this.fetchCatImage( selectedCat.id );
    }
  }

  fetchCatImage( breedId: string ) {
    this.loading.set( true );
    this.catsService.getImages( breedId ).subscribe( {
      next: ( response: any ) => {
        if( response && response.length > 0 ) {
          this.catImages.set( response );
        }
        this.loading.set( false );
      }, error: ( err ) => {
        console.error( 'Error fetching cat image:', err );
        this.loading.set( false );
      }
    } );
  }

  getRatingTag( rating: number ): string {
    if( rating >= 4 ) {
      return 'success';
    }
    if( rating >= 2 ) {
      return 'warning';
    }
    return 'danger';
  }
}
