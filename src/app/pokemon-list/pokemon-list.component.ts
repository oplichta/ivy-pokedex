import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from './shared/pokemon';
import { Observable } from 'rxjs';
import { PokemonListService } from './shared/pokemon-list.service';
import { map, take, flatMap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  public pokemons$: Observable<Pokemon[]>;
  public selectedPokemon: Pokemon;

  @Output() openDialog = new EventEmitter<string>();

  constructor(
    private pokemonListService: PokemonListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokemonListService
      .getPokemons()
      .pipe(map((response) => response.cards));
  }

  public onOpenDialog(pokemonId: string) {
    this.pokemonListService
      .getPokemonById(pokemonId)
      .pipe(
        take(1),
        map((response) => response.cards)
      )
      .subscribe((res) => {
        this.dialog.open(PokemonDetailsComponent, {
          height: '1200px',
          width: '800px',
          data: res[0],
        });

        this.selectedPokemon = res[0];

        const params = {
          types: this.selectedPokemon.types,
          supertype: 'Pokémon',
          rarity: this.selectedPokemon.rarity,
        };

        this.pokemonListService.similarPokemons$ = this.pokemonListService
          .getPokemonWithParams(params)
          .pipe(
            map((pokemonArray) =>
              pokemonArray.cards
                .filter(
                  (pokemon) =>
                    pokemon.hp >= this.selectedPokemon.hp * 0.9 &&
                    pokemon.hp <= this.selectedPokemon.hp * 1.1
                )
                .slice(1, 4)
            )
          );
        );
      });
  }
}
