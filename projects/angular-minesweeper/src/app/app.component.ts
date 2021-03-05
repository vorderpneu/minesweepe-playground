import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fillFlaggedFieldsArray, setupMinefield } from './helpers/helpers';
import { bombs, columns, Field, rows } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public minefield: Observable<Field[][] | null> = new Observable<Field[][]>();
  public flaggedFields: string[] = [];
  constructor() {
  }
  public ngOnInit(): void {
    const newMinefield: Field[][] = [];
    for (let i = 0; i < rows; i++) {
      newMinefield[i] = [];
      for (let j = 0; j < columns; j++) {
        newMinefield[i][j] = 0;
      }
    }
    this.minefield = of(setupMinefield(newMinefield, bombs));
  }

  public handleLeftClickOnField($event: Event) {
    console.log($event);
  }

  public handleRightClickOnField(id: string) {
    this.flaggedFields = fillFlaggedFieldsArray([...this.flaggedFields], id, bombs);
  }
}
