import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWIthMultipleWinners } from './list-with-multiple-winners';

describe('ListWIthMultipleWinners', () => {
  let component: ListWIthMultipleWinners;
  let fixture: ComponentFixture<ListWIthMultipleWinners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWIthMultipleWinners],
    }).compileComponents();

    fixture = TestBed.createComponent(ListWIthMultipleWinners);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
