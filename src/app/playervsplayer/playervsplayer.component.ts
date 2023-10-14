import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { LogComponent } from '../log/log.component';
import { ComputerComponent } from '../computer/computer.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-player-vs-player',
  standalone: true,
  imports: [LogComponent, ComputerComponent, GameBoardComponent, CommonModule],
  template: `<div>
  <h1>{{ player1Name }} vs. {{ player2Name }} </h1>

  <h2 *ngIf="!gameService.gameOver"> Current Player: {{ gameService.currentPlayer }}</h2>
  <div class="grid-container">
   <div class="leftSide">
     <app-game-board [board]="gameService.board" [winner]="gameService.winner"></app-game-board>
     <h2 *ngIf="gameService.winner === 'draw'"> It's a draw!</h2>
     <h2 *ngIf="gameService.winner!== null&&gameService.winner!== 'draw' ">Winner is: <b>{{ gameService.winner }}</b></h2>
     

     <button (click)="gameService.resetGame()">Reset Game</button>  
   </div>

   <div class="log-container">
    <app-log [moves]="gameService.moves"></app-log>
  </div>
 </div>
</div>`,
styleUrls:['./playervsplayer.component.css'],

  })
  export class PlayervsplayerComponent implements OnInit, OnDestroy{  
  playerMode: number = 2;
  player1Name: string = '';
  player2Name: string = '';
  constructor(private route: ActivatedRoute, public gameService: GameService) {}

    ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playerMode = +params['playerMode'];
      this.player1Name = params['player1Name'];
      this.player2Name = params['player2Name'];

      this.gameService.setPlayerNames(this.player1Name, this.player2Name);
    
    });

  }
  ngOnDestroy() {
    this.gameService.resetGame();
    this.gameService.currentPlayer="";
  }

  
handleSquareClickForPlayer1(index: number) {
  this.gameService.handleSquareClick(index, this.player1Name);
}


handleSquareClickForPlayer2(index: number) {
  this.gameService.handleSquareClick(index, this.player2Name);
}

}
