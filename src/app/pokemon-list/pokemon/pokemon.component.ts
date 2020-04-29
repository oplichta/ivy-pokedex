import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../shared/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() openDialog = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  public onOpenDialog() {
    this.openDialog.next(this.pokemon.id);
  }
}
