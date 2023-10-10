import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { LogComponent } from '../log/log.component';
import { ComputerComponent } from '../computer/computer.component';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-player-vs-player',
  standalone: true,
  imports: [LogComponent, ComputerComponent, GameBoardComponent],
  template: `<div>
  <h2>{{ player1Name }} vs. {{ player2Name }} </h2>

  <h3> Current Player: {{ gameService.currentPlayer }}</h3>
  <div class="grid-container">
   <div class="leftSide">
     <app-game-board [board]="gameService.board" [winner]="gameService.winner"></app-game-board>
     <h2>Winner is: <b> {{gameService.winner}} </b> </h2>
     
     <button (click)="gameService.resetGame()">Reset Game</button>  
   </div>

   <div class="log-container">
    <app-log [moves]="gameService.moves"></app-log>
  </div>
 </div>
</div>`,
styleUrls:['./playervsplayer.component.css'],

  })
  export class PlayervsplayerComponent{  
  playerMode: number = 2;
  player1Name: string = '';
  player2Name: string = '';
  constructor(private route: ActivatedRoute, public gameService: GameService) {
    this.route.queryParams.subscribe(params => {
      this.playerMode = +params['playerMode'];
      this.player1Name = params['player1Name'];
      this.player2Name = params['player2Name'];

      this.gameService.setPlayerNames(this.player1Name, this.player2Name);

    
    });
  }

  handleSquareClick(index: number) {
    this.gameService.handleSquareClick(index);
  }
}
