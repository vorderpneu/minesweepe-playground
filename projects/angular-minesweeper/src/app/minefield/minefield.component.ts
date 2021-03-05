import { Component, EventEmitter, Input, Output } from '@angular/core';
import { arrayOfStringsContainsValue } from '../helpers/helpers';
import { Field } from '../model/model';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.scss']
})
export class MinefieldComponent {
  @Input() minefield: Field[][] | null = [];
  @Input() flaggedFields: string[] = [''];
  @Output() leftClickOnField = new EventEmitter<Event>();
  @Output() rightClickOnField = new EventEmitter<string>();

  emitLeftClickOnField($event: Event) {
    this.leftClickOnField.emit($event);
  }

  emitRightClickOnField(id: string) {
    this.rightClickOnField.emit(id);
  }

  isFlagged(id: string): boolean {
    return arrayOfStringsContainsValue(this.flaggedFields, id);
  }
}
