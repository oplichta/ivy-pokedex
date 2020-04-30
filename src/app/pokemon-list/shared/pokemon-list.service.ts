import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cards, Pokemon } from './pokemon';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  public similarPokemons$: Observable<Pokemon[]>;
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

  getPokemonWithParams(par) {
    const params = this.params({
      types: par.types ? par.types.join() : '',
      supertype: par.supertype,
      rarity: par.rarity,
    });
    return this.http.get<Cards>(this.apiURL + 'cards', {
      params: params,
    });
  }
}
