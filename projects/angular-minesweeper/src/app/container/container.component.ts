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
  @Input() test: boolean = false;
  @Output() leftClickOnField = new EventEmitter<Event>();
  @Output() rightClickOnField = new EventEmitter<string>();

  emitLeftClickOnField($event: Event) {
    this.leftClickOnField.emit($event);
  }

  emitRightClickOnField(id: string) {
    this.rightClickOnField.emit(id);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
