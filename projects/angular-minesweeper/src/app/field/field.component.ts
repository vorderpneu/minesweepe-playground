import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Field, flag } from '../model/model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnChanges {
  @Input() bombs!: Field;
  @Input() isFlagged!: boolean;
  @Output() leftClickOnField = new EventEmitter<Event>();
  @Output() rightClickOnField = new EventEmitter<string>();
  $event!: Event;
  content: typeof flag| '💣' | Field | '' = '';

  @HostListener('contextmenu', ['$event'])
  onRightClick($event: MouseEvent): void  {
    $event.preventDefault();
    console.log($event.target);
    this.rightClickOnField.emit(($event.target as Element).id);
  }
  @HostListener('click', ['$event'])
  emitLeftClickOnField($event: Event): void {
    this.leftClickOnField.emit($event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.content = this.isFlagged ? flag : '';
  }
}
