import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section>
   <h1>Welcome to Tic-Tac-Toe</h1>

    <div>
    <p>Choose the number of players:</p>
    <label><input type="radio" name="playerMode" (change)="onPlayerModeChange(1)">One Player</label><br><br>
    <label><input type="radio" name="playerMode" (change)="onPlayerModeChange(2)">Two Players</label><br><br>

    <div *ngIf="selectedPlayerMode === 1">
      <input type="text" [(ngModel)]="player1Name" placeholder="Enter Player Name" class="player-input">
    </div>
    <div *ngIf="selectedPlayerMode === 2">
      <input type="text" [(ngModel)]="player1Name" placeholder="Enter Player 1 Name" class="player-input">
      <input type="text" [(ngModel)]="player2Name" placeholder="Enter Player 2 Name" class="player-input">
    </div>
    <br>
    <button (click)="startGame()">Let's get started!</button>
   </div>
  </section>
  `,
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent {
  selectedPlayerMode: number = 1;
  player1Name: string = '';
  player2Name: string = '';

  constructor(private router: Router) {}

  onPlayerModeChange(mode: number) {
    this.selectedPlayerMode = mode;
  }
  
  startGame() {
    let routePath: string= '';
    if (this.selectedPlayerMode === 1 && !this.player1Name) {
      alert('Please enter a name for Player 1.');
    } else if (this.selectedPlayerMode === 2 && (!this.player1Name || !this.player2Name)) {
      alert('Please enter names for both players.');
   } 

   else {

    if (this.selectedPlayerMode === 1) {
      routePath = '/gameboard/player-vs-computer';
    } else if (this.selectedPlayerMode === 2) {
      routePath = '/gameboard/player-vs-player';
    }

    this.router.navigate([routePath], {
      queryParams: {
        playerMode: this.selectedPlayerMode,
        player1Name: this.player1Name,
        player2Name: this.player2Name,
      },
    });
  }
  }
}
