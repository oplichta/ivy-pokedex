import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cards, Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  constructor(private http: HttpClient) {}

  apiURL = 'https://api.pokemontcg.io/v1/';

  public params(paramObject): HttpParams {
    return new HttpParams({
      fromObject: paramObject,
    });
  }

  getPokemons() {
    return this.http.get<Cards>(this.apiURL + 'cards');
  }

  getPokemonById(id: string) {
    const params = this.params({
      id: id,
    });
    return this.http.get<Cards>(this.apiURL + 'cards', {
      params: params,
    });
  }
}
