import { Component, Input,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, SquareComponent],
  template: `
  <section>
  <div class="row" *ngFor="let rowIndex of [0, 1, 2]">
    <div class="square-container">
      <div class="square" *ngFor="let colIndex of [0, 1, 2]">
        <app-square
          [value]="gameService.board[rowIndex * 3 + colIndex]"
          (squareClick)="gameService.handleSquareClick(rowIndex * 3 + colIndex)"
        ></app-square>
      </div>
    </div>
  </div>
</section>

`,
  styleUrls: ['./game-board.component.css']
})

export class GameBoardComponent {
  constructor(public gameService: GameService, private route: ActivatedRoute){}
  @Input() board: string[] = [];
  @Input() winner: string | null = null;
}

