import { Component, Input, OnChanges, ElementRef, AfterViewInit } from '@angular/core';
import { SymbolChartData } from '../../models';
import { WindowSize } from '../../utils/WindowSize';
import * as d3 from 'd3';

@Component({
  selector: 'volume-chart',
  templateUrl: 'volume-chart.html'
})
export class VolumeChartComponent implements OnChanges, AfterViewInit {

  @Input() private data: Array<SymbolChartData>;

  private chart: any;
  private xAxis: any;
  private updated: boolean = false;

  constructor(private elementRef: ElementRef, private window: WindowSize) {
    window.height$.subscribe(function (w) {  }.bind(this));
    window.width$.subscribe(function (w) {  }.bind(this));
  }

  ngOnChanges() {
    if (this.chart) {
      //this.updateChart();
    }
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  private initializeChart() {
    this.chart = d3.select('#internal-volume-chart-container');
    //this.xAxis = this.chart.append('g').attr('class', 'x axis');
  }

  private updateChart() {
    console.log(this.data);

    if (!this.chart || !this.data || this.data.length == 0) {
      return;
    }

    var width = this.elementRef.nativeElement.offsetWidth - 10;
    var height = this.elementRef.nativeElement.offsetHeight - 10;

    var xAxisHeight = 20;

    var xScale = d3.scaleTime()
      .domain([d3.min(this.data, function(d) { return new Date(d.Date); }), d3.max(this.data, function(d) { return new Date(d.Date) })])
      .range([0, width]);

    var xAxisGen = d3.axisBottom(xScale);

    var yScale = d3.scaleLinear()
      .domain([d3.min(this.data, function(d) { return d.Volume }), d3.max(this.data, function(d) { return d.Volume })])
      .range([height, 0]);

/*     this.chart.selectAll(".bar")
      .data(this.data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(new Date(d.Date)); })
      .attr("width", function(d) { return xScale(new Date(d.Date)); })
      .attr("y", function(d) { console.log(d); return yScale(d.Volume); })
      .attr("height", function(d) { return this.elementRef.nativeElement.offsetHeight - yScale(d.Volume); }.bind(this));
 */
    //this.xAxis.call(xAxisGen);
    this.chart.append('g').attr('class', 'y axis')
      //.attr('height', height - xAxisHeight)
      .attr("transform", "translate("+[5, 0]+")")
      .call(d3.axisRight(yScale).tickArguments([3]));
    this.chart.append('g').attr('class', 'x axis')
      //.attr('height', height)
      //.attr("transform", "translate("+[5, height - xAxisHeight]+")")
      .call(xAxisGen.tickArguments([d3.timeDay.every(1)]));
  }

}
