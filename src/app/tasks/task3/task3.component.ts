import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/mat-imports';

@Component({
  selector: 'app-task3',
  standalone: true,
  imports: SHARED_IMPORTS,
  templateUrl: './task3.component.html',
  styleUrl: './task3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Task3Component {
  asset = {
    name: '1964 Aston Martin DB5',
    category: 'Automotive / Classic Car',
    medium: 'Grand touring coupe',
    origin: 'Originally delivered to London, UK',
    location: 'Private collection, Munich, Germany',
    image: 'astonMartin.png',
    estimatedValue: 6_200_000,
    currency: 'USD',
    lastAppraisal: '2023-09-18',
    acquisitionDate: '2014-04-04',
    acquisitionCost: 4_100_000,
    serialNumber: 'DB5/1877/R',
    provenance: 'Owned by a famous celebrity; displayed at a renowned museum',
    condition: 'Pristine',
  };

  priceSeries = [
    { t: 2014, v: 28 },
    { t: 2015, v: 30 },
    { t: 2016, v: 32 },
    { t: 2017, v: 34 },
    { t: 2018, v: 33 },
    { t: 2019, v: 36 },
    { t: 2020, v: 39 },
    { t: 2021, v: 41 },
    { t: 2022, v: 43 },
    { t: 2023, v: 45 },
  ];

  transactions = [
    { date: '2023-11-02', price: 44_000_000, location: 'Geneva, Switzerland' },
    { date: '2021-05-18', price: 40_500_000, location: 'New York, USA' },
    { date: '2018-10-09', price: 33_250_000, location: 'London, UK' },
    { date: '2015-03-27', price: 29_800_000, location: 'Paris, France' },
  ];

  get startingValue(): number {
    return this.priceSeries[0]?.v ?? 0;
  }

  get endingValue(): number {
    return this.priceSeries[this.priceSeries.length - 1]?.v ?? 0;
  }

  get netChange(): number {
    return this.endingValue - this.startingValue;
  }

  get growthPct(): number {
    if (!this.startingValue) {
      return 0;
    }
    return (this.netChange / this.startingValue) * 100;
  }

  get cagr(): number {
    const periods = this.priceSeries.length - 1;
    if (periods <= 0 || !this.startingValue) {
      return 0;
    }
    return (
      (Math.pow(this.endingValue / this.startingValue, 1 / periods) - 1) * 100
    );
  }

  get bestYear(): { year: number; value: number } | null {
    if (!this.priceSeries.length) {
      return null;
    }
    const bestPoint = this.priceSeries.reduce(
      (best, current) => (current.v > best.v ? current : best),
      this.priceSeries[0]
    );
    return { year: bestPoint.t, value: bestPoint.v };
  }

  get linePath(): string {
    const w = 640,
      h = 240,
      pad = 36;
    const xs = this.priceSeries.map((d) => d.t);
    const ys = this.priceSeries.map((d) => d.v);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs);
    const minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const sx = (x: number) =>
      pad + ((x - minX) / (maxX - minX)) * (w - pad * 2);
    const sy = (y: number) =>
      h - pad - ((y - minY) / (maxY - minY)) * (h - pad * 2);

    return this.priceSeries
      .map(
        (d, i) =>
          `${i === 0 ? 'M' : 'L'} ${sx(d.t).toFixed(1)} ${sy(d.v).toFixed(1)}`
      )
      .join(' ');
  }
}
