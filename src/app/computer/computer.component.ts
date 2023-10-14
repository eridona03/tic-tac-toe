import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-computer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
    <button (click)="makeComputerMove()">Make Computer Move</button>
  </div>
  `,
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent {
  
  @Output() computerMove: EventEmitter<number> = new EventEmitter<number>(); 

  makeComputerMove() {
    
      
      const randomMove = Math.floor(Math.random() * 9); // 3x3 game board
      this.computerMove.emit(randomMove);
   
  
  }

}
