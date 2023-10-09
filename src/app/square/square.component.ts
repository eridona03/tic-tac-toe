import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  template: `
  <button [disabled]="value || winner" (click)="onClick()">{{ value }}</button>
  `,
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  
  @Input() value: string = '';
  @Input() winner: boolean = false;
  @Output() squareClick = new EventEmitter<void>();

  onClick() {
    this.squareClick.emit();
  }
}
