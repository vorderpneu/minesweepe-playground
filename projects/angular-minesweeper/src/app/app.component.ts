import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import {
  flagField,
  initialize2dArray,
  setupMinefield,
  checkClickedField,
  countOccurenceOfEllementInArray,
  endGame
} from './helpers/helpers';
import {
  bombIcon,
  bombs,
  columns,
  Field,
  flagIcon,
  GameProgressField,
  invalidFieldId,
  RowColumnObj
} from './model/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public initializedGameMinefield$: Observable<Field[][]> = new Observable<Field[][]>();
  public gameProgressMinefield$: Observable<GameProgressField[][]> = new Observable<GameProgressField[][]>();
  public initializedGameMinefield: Field[][] = [];
  public gameProgressMinefield: GameProgressField[][] = [];
  public flaggedFields: RowColumnObj[] = [];
  public revealedFields: string[] = [];
  public hitBomb: RowColumnObj = invalidFieldId;

  public ngOnInit(): void {
    this.initializedGameMinefield = setupMinefield(initialize2dArray([], 0) as unknown as Field[][], bombs);
    this.initializedGameMinefield$ = of(this.initializedGameMinefield );

    this.gameProgressMinefield = initialize2dArray([], undefined) as unknown as GameProgressField[][];
    this.gameProgressMinefield$ =  of(this.gameProgressMinefield);
  }

  handleLeftClickOnField(id: RowColumnObj): void {
      this.gameProgressMinefield =
        checkClickedField(cloneDeep(this.gameProgressMinefield), cloneDeep(this.initializedGameMinefield), id.row, id.column);

      if (countOccurenceOfEllementInArray(this.gameProgressMinefield, bombIcon) >= 1) {
        this.gameProgressMinefield = endGame(cloneDeep(this.initializedGameMinefield), 'loss');
        this.hitBomb = id;
      } else if (countOccurenceOfEllementInArray(this.gameProgressMinefield, undefined) === bombs) {
        this.gameProgressMinefield = endGame(cloneDeep(this.initializedGameMinefield), 'win');
      }
  }

  handleRightClickOnField(id: RowColumnObj): void {
    const flagFieldRes = flagField(cloneDeep(this.gameProgressMinefield), [...this.flaggedFields], id, bombs);
    this.flaggedFields = flagFieldRes.flaggedFields;
    this.gameProgressMinefield = flagFieldRes.minefield;
  }
}
