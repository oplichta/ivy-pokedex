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

  getPokemon(id?, page?, types?, supertype?, rarity?) {
    const params = this.params({
      id: id === undefined ? '' : id,
      page: page === undefined ? '' : page,
      pageSize: 20,
      types: types ? types.join() : '',
      supertype: supertype === undefined ? '' : supertype,
      rarity: rarity === undefined ? '' : rarity,
    });
    return this.http.get<Cards>(this.apiURL + 'cards', {
      params: params,
    });
  }
}
