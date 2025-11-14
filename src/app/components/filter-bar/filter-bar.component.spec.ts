import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBarComponent } from './filter-bar.component';

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;

  const buildComponent = (fields: any[] = []) => {
    component.fields = fields;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
  });

  it('should build a form with initial values from fields', () => {
    buildComponent([
      { key: 'name', type: 'text', value: 'Ronali' },
      { key: 'active', type: 'boolean' },
      { key: 'category', type: 'select' },
    ]);

    expect(component.form.value).toEqual({
      name: 'Ronali',
      active: false,
      category: null,
    });
  });

  it('should emit cleaned values on submit', () => {
    buildComponent([
      { key: 'name', type: 'text' },
      { key: 'active', type: 'checkbox' },
      { key: 'tags', type: 'multiselect' },
    ]);
    const spy = spyOn(component.filterChange, 'emit');
    component.form.patchValue({ name: 'ETF', active: true, tags: [] });

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({ name: 'ETF', active: true });
  });

  it('should reset fields to their defaults and emit cleaned values', () => {
    buildComponent([
      { key: 'name', type: 'text', value: 'Ronali' },
      { key: 'active', type: 'checkbox', value: true },
      { key: 'tags', type: 'multiselect' },
    ]);
    component.form.patchValue({ name: 'ETF', active: false, tags: ['tech'] });
    const spy = spyOn(component.filterChange, 'emit');

    component.onReset();

    expect(component.form.value).toEqual({
      name: 'Ronali',
      active: true,
      tags: [],
    });
    expect(spy).toHaveBeenCalledWith({ name: 'Ronali', active: true });
  });
});
