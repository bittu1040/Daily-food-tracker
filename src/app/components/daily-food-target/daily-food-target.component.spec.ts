import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFoodTargetComponent } from './daily-food-target.component';

describe('DailyFoodTargetComponent', () => {
  let component: DailyFoodTargetComponent;
  let fixture: ComponentFixture<DailyFoodTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyFoodTargetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyFoodTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
