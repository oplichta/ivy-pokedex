import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cards } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get<Cards>('https://api.pokemontcg.io/v1/cards');
  }
}
