import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExchangeService } from '../../services/exchange.service';
import { TickerSymbol, SymbolChartData } from '../../models';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Http } from '@angular/http';

@Component({
  selector: 'page-exchange-detail',
  templateUrl: 'exchange-detail.html',
  animations: [
    trigger('symbolState', [
      state('*', style({
        background: 'transparent'
      })),
      transition('* => positive', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'green', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
      transition('positive => positive', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'green', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
      transition('* => negative', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'red', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
      transition('negative => negative', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'red', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
    ])
  ],
})
export class ExchangeDetailPage {

  private symbol: TickerSymbol;
  private symbolData: SymbolChartData[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private exchangeService: ExchangeService, public http: Http) {
    this.symbol = navParams.data;
    this.exchangeService.ticker$.subscribe(this.onTickerUpdate.bind(this));
    this.exchangeService.getChartData(this.symbol.CurrencyPair, new Date('7-15-2017').getTime() / 1000 | 0, Date.now() / 1000 | 0, 1800).then((data) => {
      this.symbolData = data;
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangeDetailPage');
    // nv.addGraph(this.createChart.bind(this));
  }

  private onTickerUpdate(data: TickerSymbol[]) {
    var update = data.find(item => item.CurrencyPair == this.symbol.CurrencyPair);

    if (update) {
      this.symbol = update;
    }
  }

  private presentExchangeList(event: any) {
    // let popover = this.popoverCtrl.create(PopoverPage);
    // popover.present({
    //   ev: myEvent
    // });
  }

  // private chartOptions = {
  //           chart: {
  //               type: 'candlestickBarChart',
  //               height: 450,
  //               margin : {
  //                   top: 20,
  //                   right: 20,
  //                   bottom: 66,
  //                   left: 60
  //               },
  //               x: function(d){ return d['date']; },
  //               y: function(d){ return d['close']; },
  //               duration: 100,

  //               xAxis: {
  //                   axisLabel: 'Dates',
  //                   tickFormat: function(d) {
  //                       return d3.timeFormat('%x')(new Date(Date.now() - (20000 * 86400000) + (d * 86400000)));
  //                   },
  //                   showMaxMin: false
  //               },

  //               yAxis: {
  //                   axisLabel: 'Stock Price',
  //                   tickFormat: function(d){
  //                       return '$' + d3.format(',.1f')(d);
  //                   },
  //                   showMaxMin: false
  //               },
  //               zoom: {
  //                   enabled: true,
  //                   scaleExtent: [1, 10],
  //                   useFixedDomain: false,
  //                   useNiceScale: false,
  //                   horizontalOff: false,
  //                   verticalOff: true,
  //                   unzoomEventType: 'dblclick.zoom'
  //               }
  //           }
  //       };

  // private createChart() {
  //   var chart = nv.models.candlestickBarChart()
  //     .x(function (d) { return d['date'] })
  //     .y(function (d) { return d['close'] })
  //     .duration(250)
  //     .margin({ left: 75, bottom: 50 });
  //   // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
  //   chart.xAxis
  //     .axisLabel("Dates")
  //     .tickFormat(function (d) {
  //       // I didn't feel like changing all the above date values
  //       // so I hack it to make each value fall on a different date
  //       return d3.time.format('%x')(new Date(Date.now() - (20000 * 86400000) + (d * 86400000)));
  //     });
  //   chart.yAxis
  //     .axisLabel('Stock Price')
  //     .tickFormat(function (d, i) { return '$' + d3.format(',.1f')(d); });

  //     console.log(this.symbolData);
  //     console.log(d3.select('#chartContainer'));

  //   d3.select("#chartContainer")
  //     .datum(this.symbolData)
  //     .transition().duration(500)
  //     .call(chart);

  //   nv.utils.windowResize(chart.update);
  //   return chart;
  // }
}
