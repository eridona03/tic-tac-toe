import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
  
})
export class GameService {

  constructor() {
    this.resetGame();
  }
 
  currentPlayer: number = 1;
  public board: string[] = Array(9).fill('');
  moves: { playerName: string; cellIndex: number; symbol: string }[] = [];
  locked: boolean = false;
  winner: string | null = null;
  
  winningCombinations: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rreshtat
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Shtyllat
    [0, 4, 8], [2, 4, 6] // Diagonalet
  ];

  get getBoard (){
    return this.board
  }

  /*set setBoard( board  ){
    this.board = [...board]
  }*/

  handleComputerMove(move: number) {
    if (!this.board[move] && !this.winner && !this.locked) {
    
      this.board[move] = 'O';
      this.checkForWinner();
      this.currentPlayer = 1;
    }
  }
  

  boardIsFull():boolean{
    return this.board.every(square => square === 'X' || square === 'O');
  }

  checkForWinner() {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {

        this.winner = this.board[a];
        break;
      }
      else if(this.boardIsFull() && !this.winner) {
        console.log('It\'s a draw!');
      }
    }
  }
  
  handleSquareClick(index: number) {
    if (!this.board[index] && !this.winner && !this.locked) {
      //percaktimi i simbolit sipas rradhes
      if (this.currentPlayer === 1) 
        this.board[index] = 'X';
      else {this.board[index] = 'O';}

      this.checkForWinner();
      //nderrimi i rradhes pas levizjes
      if (this.currentPlayer === 1)
        this.currentPlayer = 2;
      else {this.currentPlayer = 1;}
    }
  }
  
  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 1;
    this.winner = null;
    this.locked = false;
    this.moves = []; 
  }

  
}
