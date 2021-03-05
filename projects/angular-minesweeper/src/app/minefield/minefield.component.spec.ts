import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldComponent } from '../field/field.component';
import { MinefieldComponent } from './minefield.component';

describe('MinefieldComponent', () => {
  let component: MinefieldComponent;
  let fixture: ComponentFixture<MinefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinefieldComponent, FieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
