import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player-vs-player',
  standalone: true,
  template: `<p>hey</p>`,
  
})
export class PlayerVsPlayerComponent {
  constructor(public gameService: GameService) {}


  handleSquareClick(index: number) {
    this.gameService.handleSquareClick(index);
  }
}
