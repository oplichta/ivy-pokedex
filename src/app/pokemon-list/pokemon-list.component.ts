import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from './shared/pokemon';
import { Observable } from 'rxjs';
import { PokemonListService } from './shared/pokemon-list.service';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  public pokemons$: Observable<Pokemon[]>;
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

  public onOpenDialog(id: string) {
    this.pokemonListService
      .getPokemonById(id)
      .pipe(
        take(1),
        map((response) => response.cards)
      )
      .subscribe((res) =>
        this.dialog.open(PokemonDetailsComponent, {
          height: '1200px',
          width: '800px',
          data: res[0],
        })
      );
  }
}
