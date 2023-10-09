import { Component, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { LogComponent } from '../log/log.component';
import { ComputerComponent } from '../computer/computer.component';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-player-vs-computer',
  standalone: true,
  imports: [LogComponent, ComputerComponent, GameBoardComponent],
  template: `
  <div>
    <h2>{{ player1Name }} vs. Computer</h2>
  
    <app-game-board [board]="gameService.board" [winner]="gameService.winner"></app-game-board>
    <p>Winner is: {{gameService.winner}} </p>
  
    <app-computer (computerMove)="handleComputerMove($event)"></app-computer>
  
    <app-log [moves]="gameService.moves"></app-log>
    
    <button (click)="gameService.resetGame()">Reset Game</button>
  </div>
  `,
  
})
export class PlayerVsComputerComponent {

  playerMode: number = 1;
  player1Name: string = '';
  player2Name: string = 'Computer';
  @Output() computerMove = new EventEmitter<number>();

  constructor(private route: ActivatedRoute, public gameService: GameService) {
    this.route.queryParams.subscribe(params => {
      this.playerMode = +params['playerMode'];
      this.player1Name = params['player1Name'];
      //this.player2Name = params['player2Name'];

      this.computerMove.subscribe((move: number) => {
        this.handleComputerMove(move);

      })
    });
  }

  handleSquareClick(index: number) {
    this.gameService.handleSquareClick(index);
  }

  handleComputerMove(move: number) {
    if (!this.gameService.board[move] && !this.gameService.winner && !this.gameService.locked) {
    
      this.gameService.board[move] = 'O';
      this.gameService.checkForWinner();
      this.gameService.currentPlayer = 1;
    }
  }
  
}
