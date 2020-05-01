import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../shared/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  public showSpinner = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onOpenDialog() {
    this.router.navigate(['/details', this.pokemon.id]);
  }
}
