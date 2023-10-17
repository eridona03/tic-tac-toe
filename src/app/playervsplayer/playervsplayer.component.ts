import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LogComponent } from '../log/log.component';
import { ComputerComponent } from '../computer/computer.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { CommonModule } from '@angular/common';
import { GameResults } from '../game-results';
import { GameResultsComponent } from '../game-results/game-results.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-player-vs-player',
  standalone: true,
  imports: [LogComponent, ComputerComponent, GameBoardComponent, CommonModule, RouterModule, GameResultsComponent,],
  template: `<div>
  <h1>{{ player1Name }} vs. {{ player2Name }} </h1>

  <h2 *ngIf="!gameService.gameOver"> Current Player: {{ gameService.currentPlayer }}</h2>
  <div class="grid-container">
   <div class="leftSide">
     <app-game-board [board]="gameService.board" [winner]="gameService.winner"></app-game-board>
     <h2 *ngIf="gameService.winner === 'draw'"> It's a draw!</h2>
     <h2 *ngIf="gameService.winner!== null&&gameService.winner!== 'draw' ">Winner is: <b>{{ gameService.winner }}</b></h2>
     
     <button (click)="gameService.resetGame()">Reset Game</button> 
     <button (click)="openGameResultsModal()">Show Game Results</button>
 
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
  private player1Subscription!: Subscription;
  private player2Subscription!: Subscription;
  gameResultPlayer1!: GameResults;
  gameResultPlayer2!: GameResults;



  constructor(private route: ActivatedRoute, public gameService: GameService, private dialog: MatDialog) {}
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playerMode = +params['playerMode'];
      this.player1Name = params['player1Name'];
      this.player2Name = params['player2Name'];

      this.gameService.setPlayerNames(this.player1Name, this.player2Name);
      this.gameService.currentPlayer = this.player1Name;
    
    });

    this.player1Subscription = this.gameService
        .getGameResults(this.player1Name)
        .subscribe((result: any) => {
          console.log('Player 1 data:', result);
          this.gameResultPlayer1 = result;
        });

      this.player2Subscription = this.gameService
        .getGameResults(this.player2Name)
        .subscribe((result: any) => {
          console.log('Player 2 data:', result);
          this.gameResultPlayer2 = result;
        });

  }
  ngOnDestroy() {
    if (this.player1Subscription) {
      this.player1Subscription.unsubscribe();
    }
    if (this.player2Subscription) {
      this.player2Subscription.unsubscribe();
    }

    this.gameService.resetGame();
  }

  
handleSquareClickForPlayer1(index: number) {
  this.gameService.handleSquareClick(index, this.player1Name);
}


handleSquareClickForPlayer2(index: number) {
  this.gameService.handleSquareClick(index, this.player2Name);
}

openGameResultsModal() {
  console.log('Opening modal with data:', this.gameResultPlayer1, this.gameResultPlayer2);
  const dialogRef = this.dialog.open(GameResultsComponent, {
    data: {
      gameResultPlayer1: this.gameResultPlayer1,
      gameResultPlayer2: this.gameResultPlayer2,
    },
  });
}

}
