import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { generateFieldId } from '../helpers/helpers';
import { flagIcon, GameProgressField, RowColumnObj } from '../model/model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
  @Input() content!: GameProgressField;
  @Input() row!: number;
  @Input() column!: number;
  @Output() leftClickOnField = new EventEmitter<RowColumnObj>();
  @Output() rightClickOnField = new EventEmitter<RowColumnObj>();

  @HostListener('click', [])
  emitLeftClickOnField(): void {
    if (this.content === undefined) {
      this.leftClickOnField.emit({row: this.row, column: this.column});
    }
  }

  @HostListener('contextmenu', ['$event'])
  emitRightClickOnField($event: MouseEvent): void  {
    $event.preventDefault();
    if (this.content === undefined || this.content === flagIcon) {
      this.rightClickOnField.emit({row: this.row, column: this.column});
    }
  }
}
