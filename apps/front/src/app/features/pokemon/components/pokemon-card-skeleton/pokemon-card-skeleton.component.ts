import { Component, signal } from '@angular/core';
import { SquareIconComponent } from '@shared/components/icons/square-icon/square-icon.component';
import { StarIconComponent } from '@shared/components/icons/star-icon/star-icon.component';
import { TriangleIconComponent } from '@shared/components/icons/triangle-icon/triangle-icon.component';
import { PokemonShapesAnimationComponent } from '../pokemon-shapes-animation/pokemon-shapes-animation.component';

@Component({
  selector: 'app-pokemon-card-skeleton',
  imports: [
    TriangleIconComponent,
    StarIconComponent,
    SquareIconComponent,
    PokemonShapesAnimationComponent,
  ],
  templateUrl: './pokemon-card-skeleton.component.html',
  styleUrl: './pokemon-card-skeleton.component.css',
})
export class PokemonCardSkeletonComponent {}
