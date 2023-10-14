import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
  
})
export class GameService {

  constructor() {
    this.resetGame();
  }
 
  
  public board: string[] = Array(9).fill('');
  moves: { playerName: string; cellIndex: number; symbol: string }[] = [];
  locked: boolean = false;
  winner: string | null = null;
  gameOver: boolean = false;

  player1Name: string = ''; 
  player2Name: string = '';

  
  //na duhen per logun
  setPlayerNames(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  currentPlayer: string = this.player1Name;

  addMove(playerName: string, cellIndex: number, symbol: string) {
    this.moves.push({ playerName, cellIndex, symbol });
  }


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
  
  boardIsFull():boolean{
    return this.board.every(square => square === 'X' || square === 'O');
  }

  checkForWinner() {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {

        this.winner = this.currentPlayer;
        this.gameOver = true;
        break;
      }
      else if(this.boardIsFull() && !this.winner) {
        this.winner ="draw";
        this.gameOver = true;
      }
    }
  }
  
  handleSquareClick(index: number, playerName: string) {
    if (!this.board[index] && !this.gameOver) {

      //percaktimi i simbolit sipas rradhes
      const symbol = this.currentPlayer === this.player1Name ? 'X' : 'O';
      this.board[index] = symbol;

      this.addMove(playerName, index, symbol);

      this.checkForWinner();
      //nderrimi i rradhes pas levizjes
      if (!this.gameOver) {
      if (this.currentPlayer === this.player1Name)
        this.currentPlayer = this.player2Name;
      else {this.currentPlayer = this.player1Name;}
      }
    }
  }
  
  resetGame() {
    this.board = Array(9).fill('');
    this.winner = null;
    this.locked = false;
    this.gameOver = false;
    this.moves = []; 
    this.currentPlayer = this.player1Name;
  }

  
}
