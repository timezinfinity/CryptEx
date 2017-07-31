import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { SymbolChartData } from '../../models';
import * as d3 from 'd3';

@Component({
  selector: 'volume-chart',
  templateUrl: 'volume-chart.html'
})
export class VolumeChartComponent implements OnChanges {

  @Input() private data: Array<SymbolChartData>;
  //@ViewChild('chart') chart;

  private chart: d3.Selection<any, any, any, any>;
  private xAxis: d3.Selection<any, any, any, any>;

  constructor(private elementRef: ElementRef) {
    this.initializeChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  private initializeChart() {
    this.chart = d3.select('internal-chart-container');
    //this.xAxis = this.chart.append('g').attr('class', 'x axis');
  }

  private updateChart() {
    console.log(this.data);

    var xAxisData = this.data.map((i) => { return i.Date } );

    var scale = d3.scaleTime()
      .domain([new Date(Math.min(...xAxisData)), new Date(Math.max(...xAxisData))])
      .range([0, this.elementRef.nativeElement.offsetWidth]);

    var xAxisGen = d3.axisBottom(scale);
    //this.xAxis.call(xAxisGen);
    this.chart.append('g').attr('class', 'x axis').call(xAxisGen);
  }

}
