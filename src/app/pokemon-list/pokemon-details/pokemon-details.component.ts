import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon, Attack } from '../shared/pokemon';
import { PokemonListService } from '../shared/pokemon-list.service';
import { Observable } from 'rxjs';
import { map, take, flatMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  public similarPkmns$: Observable<Pokemon[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemon: Pokemon,
    public pokemonListService: PokemonListService
  ) {}

  ngOnInit(): void {
    console.log(this.pokemon);
    this.similarPkmns$ = this.pokemonListService.similarPokemons$;
  }
}
