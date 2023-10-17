import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameResults } from '../game-results';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h2 mat-dialog-title class="title">Game Statistics</h2>
    <div mat-dialog-content class="dialog-content">
      <div class="player-results">
        <h3>{{ data.gameResultPlayer1.playerName }}'s Results</h3>
        <p>Wins: {{ data.gameResultPlayer1.wins }}</p>
        <p>Draws: {{ data.gameResultPlayer1.draws }}</p>
        <p>Losses: {{ data.gameResultPlayer1.losses }}</p>
      </div>
      <div class="player-results">
        <h3>{{ data.gameResultPlayer2.playerName }}'s Results</h3>
        <p>Wins: {{ data.gameResultPlayer2.wins }}</p>
        <p>Draws: {{ data.gameResultPlayer2.draws }}</p>
        <p>Losses: {{ data.gameResultPlayer2.losses }}</p>
      </div>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="closeDialog()">Close</button>
    </div>
  `,
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {
  
  constructor(
    public dialogRef: MatDialogRef<GameResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      gameResultPlayer1: GameResults;
      gameResultPlayer2: GameResults }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
