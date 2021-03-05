import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '../model/model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @Input() minefield: Field[][] | null = [];
  @Input() flaggedFields: string[] = [];
  @Input() test = false;
  @Output() leftClickOnField = new EventEmitter<Event>();
  @Output() rightClickOnField = new EventEmitter<string>();

  constructor() { }

  emitLeftClickOnField($event: Event): void  {
    this.leftClickOnField.emit($event);
  }

  emitRightClickOnField(id: string): void  {
    this.rightClickOnField.emit(id);
  }

  ngOnInit(): void {
  }

}
