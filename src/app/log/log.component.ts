import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
    <h3>Game Log</h3>
    <ul>
      <li *ngFor="let move of moves">
        <span>{{ move.playerName === gameService.player1Name ? gameService.player1Name : gameService.player2Name }}</span> placed <span>{{ move.symbol }}</span> in cell {{ move.cellIndex }}
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  constructor (public gameService: GameService){}
  @Input() moves: { playerName: string; cellIndex: number; symbol: string }[] = [];
}
