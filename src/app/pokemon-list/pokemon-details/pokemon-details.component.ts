import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../shared/pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public pokemon: Pokemon) {}

  ngOnInit(): void {
    console.log(this.pokemon);
  }
}
