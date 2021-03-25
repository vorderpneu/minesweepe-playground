import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { flagIcon, GameProgressField, RowColumnObj } from '../model/model';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.scss']
})
export class MinefieldComponent {
  @Input() minefield: GameProgressField[][] = [];
  @Input() revealedFields: string[] = [];
  @Input() hitBomb!: RowColumnObj;
  @Output() leftClickOnField = new EventEmitter<RowColumnObj>();
  @Output() rightClickOnField = new EventEmitter<RowColumnObj>();
  flag = flagIcon;

  emitLeftClickOnField(id: RowColumnObj): void {
    this.leftClickOnField.emit(id);
  }

  emitRightClickOnField(id: RowColumnObj): void  {
    this.rightClickOnField.emit(id);
  }


}
