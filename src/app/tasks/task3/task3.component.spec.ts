import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task3Component } from './task3.component';

describe('Task3Component', () => {
  let fixture: ComponentFixture<Task3Component>;
  let component: Task3Component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Task3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Task3Component);
    component = fixture.componentInstance;
  });

  it('computes derived metrics for the default data set', () => {
    expect(component.startingValue).toBe(28);
    expect(component.endingValue).toBe(45);
    expect(component.netChange).toBe(17);
    expect(component.growthPct).toBeCloseTo(60.714, 3);
    expect(component.cagr).toBeCloseTo(5.413, 3);
    expect(component.bestYear).toEqual({ year: 2023, value: 45 });
  });

  it('gracefully handles an empty price series', () => {
    component.priceSeries = [];

    expect(component.startingValue).toBe(0);
    expect(component.endingValue).toBe(0);
    expect(component.netChange).toBe(0);
    expect(component.growthPct).toBe(0);
    expect(component.cagr).toBe(0);
    expect(component.bestYear).toBeNull();
    expect(component.linePath).toBe('');
  });
});
