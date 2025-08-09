import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICatBreed } from '../intefaces/catBreed';
import { IBreedImage } from '../intefaces/breedImage';

@Injectable( {
  providedIn: 'root'
} )
export class CatsService {
  apiUrl = environment.apiUrl;
  http = inject( HttpClient );

  getCatsBreeds(): Observable<ICatBreed[]> {
    return this.http.get<ICatBreed[]>( `${ this.apiUrl }breeds` );
  }

  getImages( breedId: string ): Observable<IBreedImage[]> {
    return this.http.get<IBreedImage[]>(
      `${ this.apiUrl }images/search?breed_id=${ breedId }&limit=10` );
  }
}
