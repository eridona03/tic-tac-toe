import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { LogComponent } from '../log/log.component';
import { ComputerComponent } from '../computer/computer.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-vs-computer',
  standalone: true,
  imports: [LogComponent, ComputerComponent, GameBoardComponent, CommonModule],
  template: `
  <div>
    <h1>{{ player1Name }} vs. Computer </h1>

    <h2> Current Player: {{ gameService.currentPlayer }}</h2>
    <div class="grid-container">
     <div class="leftSide">
       <app-game-board [board]="gameService.board" [winner]="gameService.winner"></app-game-board>
       <h2 *ngIf="gameService.winner === 'draw'"> It's a draw!</h2>
       <h2 *ngIf="gameService.winner!== null&&gameService.winner!== 'draw' ">Winner is: <b>{{ gameService.winner }}</b></h2>

       <app-computer (computerMove)="handleComputerMove($event)"></app-computer>
       <button (click)="gameService.resetGame()">Reset Game</button>  
     </div>

     <div class="log-container">
      <app-log [moves]="gameService.moves"></app-log>
    </div>
   </div>
  </div>
  `,
  styleUrls:['./player-vs-computer.component.css'],

})
export class PlayerVsComputerComponent implements OnInit, OnDestroy{

  playerMode: number = 1;
  player1Name: string = '';
  player2Name: string = 'Computer';
  @Output() computerMove = new EventEmitter<number>();

  constructor(private route: ActivatedRoute, public gameService: GameService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.playerMode = +params['playerMode'];
      this.player1Name = params['player1Name'];

      this.gameService.setPlayerNames(this.player1Name, this.player2Name);

      this.computerMove.subscribe((move: number) => {
        this.handleComputerMove(move);

      })
    });
    
  }
  

  ngOnDestroy() {
    this.gameService.resetGame();
    this.gameService.currentPlayer="";
  }

  handleSquareClick(index: number) {
    this.gameService.handleSquareClick(index, this.player1Name);
  }

  handleComputerMove(move: number) {
    if (!this.gameService.board[move] && !this.gameService.winner && !this.gameService.locked) {
      

      const symbol = 'O'; 
      this.gameService.board[move] = symbol;

      this.gameService.addMove(this.player2Name, move, symbol);
      
      this.gameService.checkForWinner();
      this.gameService.currentPlayer = this.player1Name;

    }
  }
  
}
