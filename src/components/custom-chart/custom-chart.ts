import { Component, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'custom-chart',
  templateUrl: 'custom-chart.html'
})
export class CustomChartComponent implements AfterViewInit, OnChanges {

  private xAxisOffset;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {
    this.initialize();
  }

  private initialize() {
    console.log(this.elementRef);
    this.xAxisOffset = this.elementRef.nativeElement.offsetHeight - 25;
  }
}
