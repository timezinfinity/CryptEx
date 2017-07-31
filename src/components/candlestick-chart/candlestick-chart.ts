import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'candlestick-chart',
  templateUrl: 'candlestick-chart.html'
})
export class CandlestickChartComponent implements OnChanges {

  @Input() private data: Array<any>;
  @ViewChild('chart') chart;

  private labels: false;

  constructor() {
    this.initializeChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  private initializeChart() {
  }

  private updateChart() {
    console.log(this.data);
  }
}
