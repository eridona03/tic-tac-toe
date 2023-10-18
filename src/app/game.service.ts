import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GameResults } from './game-results';

@Injectable({
  providedIn: 'root',
  
})

export class GameService {

  public board: string[] = Array(9).fill('');
  moves: { playerName: string; cellIndex: number; symbol: string }[] = [];
  winner: string | null = null;
  gameOver: boolean = false;


  player1Name: string = ''; 
  player2Name: string = '';
  currentPlayer: string='';

  constructor(private firestore: AngularFirestore) {
    console.log('GameService constructor called');
    this.resetGame();
    this.currentPlayer = this.player1Name;
  }
  
  //na duhen per logun
  setPlayerNames(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  addMove(playerName: string, cellIndex: number, symbol: string) {
    this.moves.push({ playerName, cellIndex, symbol });
  }


  winningCombinations: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rreshtat
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Shtyllat
    [0, 4, 8], [2, 4, 6] // Diagonalet
  ];

  
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

      //nderrimi i rradhes nese s'ka mbaruar loja
      if (!this.gameOver) {
        if (this.currentPlayer === this.player1Name)
          this.currentPlayer = this.player2Name;
        else {this.currentPlayer = this.player1Name;}
      }
      else{//bejme update ne firebase
        this.updateGameResult(this.player1Name, this.winner);
        this.updateGameResult(this.player2Name, this.winner);
      }
    }
  }

 
  resetGame() {
    this.board = Array(9).fill('');
    this.winner = null;
    this.gameOver = false;
    this.moves = []; 
    this.currentPlayer = this.player1Name;
  }

  ///firebase related functions
  saveGameResult(gameResult: GameResults) {
    this.firestore.collection('playerStatistics').doc(gameResult.playerName).set(gameResult);
  }

  updateGameResult(playerName: string, result: string | null) {
    const gameResult: GameResults = {
      playerName,
      wins: 0,
      draws: 0,
      losses: 0,
    };

    if (result === playerName) {
      gameResult.wins = 1;
    } else if (result === 'draw') {
      gameResult.draws = 1;
    } else {
      gameResult.losses = 1;
    }

    
   const statsSubscription= this.firestore
      .collection('playerStatistics')
      .doc(playerName)
      .valueChanges()
      .subscribe((statistics: any) => {
        if (statistics) {
        gameResult.wins += (statistics.wins || 0);
        gameResult.draws += (statistics.draws || 0);
        gameResult.losses += (statistics.losses || 0);
        }

        this.saveGameResult(gameResult);

        statsSubscription.unsubscribe();
      });
  }
  getGameResults(playerName: string) {
    return this.firestore.collection('playerStatistics').doc(playerName).valueChanges();
  }
  
  
}
