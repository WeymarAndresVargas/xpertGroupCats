import { Component, EventEmitter, inject, OnInit, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaModule } from 'primeng/galleria';

import { ICatBreed } from '../../../intefaces/catBreed';
import { IBreedImage } from '../../../intefaces/breedImage';
import { CatsService } from '../../../services/cats.service';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component( {
  selector: 'app-table-cats', standalone: true, imports: [
    CommonModule, FormsModule, TableModule, InputTextModule, ButtonModule, RatingModule, TagModule, TooltipModule,
    DialogModule, ProgressSpinnerModule, GalleriaModule, IconField, InputIcon
  ], templateUrl: './table-cats.html', styleUrls: [ './table-cats.scss' ]
} )
export class TableCats implements OnInit {
  protected catBreeds = signal<ICatBreed[]>( [] );
  protected loading = signal<boolean>( false );
  protected displayDialog = false;
  protected selectedCat: ICatBreed | null = null;
  protected catImages = signal<IBreedImage[]>( [] );
  protected dialogLoading = false;

  private catsService = inject( CatsService );

  @ViewChild( 'table' ) table!: Table;

  ngOnInit() {
    this.getCatsBreeds();
  }

  getCatsBreeds() {
    this.loading.set( true );
    this.catsService.getCatsBreeds().subscribe( {
      next: ( cats ) => {
        this.catBreeds.set( cats );
        this.loading.set( false );
      }, error: ( err ) => {
        console.error( 'Error fetching cat breeds:', err );
        this.loading.set( false );
      }
    } );
  }

  onGlobalFilter( event: Event ) {
    const  filterValue  = (
      event.target as HTMLInputElement
    ).value;
   this.table.filterGlobal( filterValue, 'contains' );
  }

  viewDetails( cat: ICatBreed ) {
    this.selectedCat = cat;
    this.displayDialog = true;
    this.fetchCatImages( cat.id );
  }

  fetchCatImages( breedId: string ) {
    this.dialogLoading = true;
    this.catsService.getImages( breedId ).subscribe( {
      next: ( images ) => {
        this.catImages.set( images );
        this.dialogLoading = false;
      }, error: ( err ) => {
        console.error( 'Error fetching cat images:', err );
        this.catImages.set( [] );
        this.dialogLoading = false;
      }
    } );
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedCat = null;
    this.catImages.set( [] );
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

