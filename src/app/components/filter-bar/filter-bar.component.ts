import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/mat-imports';

@Component({
  selector: 'filter-bar',
  standalone: true,
  imports: SHARED_IMPORTS,
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent implements OnInit, OnChanges {
  @Input() fields: any[] = [];
  @Input() debounce = 300;
  @Output() filterChange = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.buildForm();
    }
  }

  private buildForm() {
    const group: any = {};
    (this.fields || []).forEach((f) => {
      const initial =
        f?.value !== undefined
          ? f.value
          : f.type === 'multiselect'
          ? []
          : f.type === 'checkbox' || f.type === 'boolean'
          ? false
          : f.type === 'select'
          ? null
          : '';
      group[f.key] = [initial];
    });
    this.form = this.fb.group(group);
    this.emitClean(this.form.value);
  }

  onSubmit() {
    this.emitClean(this.form.value);
  }

  onReset() {
    (this.fields || []).forEach((f) => {
      const ctrl = this.form.get(f.key);
      if (!ctrl) return;
      const resetVal =
        f?.value !== undefined
          ? f.value
          : f.type === 'multiselect'
          ? []
          : f.type === 'checkbox' || f.type === 'boolean'
          ? false
          : f.type === 'select'
          ? null
          : '';
      ctrl.setValue(resetVal);
    });
    this.emitClean(this.form.value);
  }

  private emitClean(raw: any) {
    const cleaned: any = {};
    for (const k of Object.keys(raw || {})) {
      const v = raw[k];
      if (v === null || v === undefined) continue;
      if (typeof v === 'string' && v.trim() === '') continue;
      if (Array.isArray(v) && v.length === 0) continue;
      cleaned[k] = v;
    }
    this.filterChange.emit(cleaned);
  }
}
