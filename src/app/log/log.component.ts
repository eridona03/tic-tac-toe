import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div id="pt1">
    <h3>Game Log</h3>
    <ul>
      <li *ngFor="let move of moves" (click)="displaySymbol(move.symbol)">
        <span>{{ move.playerName === gameService.player1Name ? gameService.player1Name : gameService.player2Name }}</span> played in cell number {{ move.cellIndex }}
      </li>
    </ul>
  </div>
  
  `,
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  constructor (public gameService: GameService){}
  @Input() moves: { playerName: string; cellIndex: number; symbol: string }[] = [];


  displaySymbol(symbol: string) {
    alert(`Placed symbol: ${symbol}`);
  }
}

