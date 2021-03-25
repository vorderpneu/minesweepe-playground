import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameProgressField, RowColumnObj } from '../model/model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @Input() minefield: GameProgressField[][] = [];
  @Input() hitBomb!: RowColumnObj;

  @Output() leftClickOnField = new EventEmitter<RowColumnObj>();
  @Output() rightClickOnField = new EventEmitter<RowColumnObj>();

  constructor() { }

  emitLeftClickOnField(id: RowColumnObj): void  {
    this.leftClickOnField.emit(id);
  }

  emitRightClickOnField(id: RowColumnObj): void  {
    this.rightClickOnField.emit(id);
  }
}
