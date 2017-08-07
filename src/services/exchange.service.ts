import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Connection } from 'autobahn';
import { TickerSymbol, SymbolChartData } from '../models';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

// Exchanges
import { Exchange } from './exchanges/exchange.interface';
import { BitfinexService } from './exchanges/bitfinex.service';
import { PoloniexService } from './exchanges/poloniex.service';

@Injectable()
export class ExchangeService implements OnDestroy {

  public Exchanges: Exchange[] = [];
  public ExchangesSubject: BehaviorSubject<Array<Exchange>> = new BehaviorSubject([]);
  public Exchanges$: Observable<Array<Exchange>> = this.ExchangesSubject.asObservable();

  public currentExchange: Exchange;

  // private apiUrlBase: string = 'https://poloniex.com/public?command=';

  // private conn;
  // private session;
  // private subscription;
  // private interval;

  public Ticker: Array<TickerSymbol> = new Array<TickerSymbol>();
  public TickerSubject: BehaviorSubject<Array<TickerSymbol>> = new BehaviorSubject([]);
  public Ticker$: Observable<Array<TickerSymbol>> = this.TickerSubject.asObservable();
  // public isConnected: boolean = false;

  constructor(public http: Http) {

    this.Exchanges.push(new BitfinexService(http));
    this.Exchanges.push(new PoloniexService(http));
    this.setCurrentExchange('bitfinex');
    this.ExchangesSubject.next(this.Exchanges);

    // this.interval = setInterval(this.getTickerDataRestfully.bind(this), 5000);

    // this.conn = new Connection({ url: 'wss://api.poloniex.com', realm: 'realm1', retry_delay_growth: 0, max_retries: -1, initial_retry_delay: 1 });
    // this.conn.onopen = (session) => {
    //   console.log('connected');
    //   this.isConnected = true;
    //   this.session = session;
    //   session.subscribe('ticker', this.onTickerData.bind(this)).then((sub) => { this.subscription = sub; });
    // };
    // this.conn.open();
    // setTimeout(function () {
    //   if (!this.isConnected) {
    //     this.conn.close();
    //     this.conn.open();
    //   }
    // }, 3000);
  }

  ngOnDestroy() {
    // console.log('ExchangeService: OnDestroy');
    // if (this.subscription) {
    //   if (this.session) {
    //     this.session.unsubscribe(this.subscription);
    //   }
    // }

    // if (this.conn) {
    //   this.conn.close();
    // }
  }

  public setCurrentExchange(type: string) {
    var exchange = this.Exchanges.find(e => e.Type === type);

    if (exchange) {
      if (this.currentExchange) {
        //TODO: Cleanup, disconnect and unsubscribe
      }

      //TODO: Subscribe and connect to live feed
      //exchange.connectToLiveFeed();

      this.currentExchange = exchange;
    }
  }

  // private getTickerDataRestfully() {
  //   if (this.isConnected) {
  //     if (this.interval) {
  //       clearInterval(this.interval);
  //     }
  //     return;
  //   }

  //   this.http.get(this.apiUrlBase + 'returnTicker').map(res => res.json()).subscribe(data => {
  //     try {
  //       for (var pair in data) {
  //         if (pair.includes("USDT")) {
  //           var symbol = [];
  //           symbol.push(pair);

  //           symbol.push(data[pair]["last"]);
  //           symbol.push(data[pair]["lowestAsk"]);
  //           symbol.push(data[pair]["highestBid"]);
  //           symbol.push(data[pair]["percentChange"]);
  //           symbol.push(data[pair]["baseVolume"]);
  //           symbol.push(data[pair]["quoteVolume"]);
  //           symbol.push(data[pair]["isFrozen"]);
  //           symbol.push(data[pair]["high24hr"]);
  //           symbol.push(data[pair]["low24hr"]);

  //           this.createUpdateTickerSymbol(symbol, false);
  //         }
  //       }

  //       this.tickerSubject.next(this.ticker);

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }

  // private onTickerData(data: any) {
  //   try {
  //     var symbol = data;

  //     if (!symbol[0].includes("USDT")) {
  //       console.log('Symbol skipped')
  //       return;
  //     }

  //     //console.log(data);

  //     this.createUpdateTickerSymbol(symbol);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // private createUpdateTickerSymbol(symbol, update = true) {
  //   try {
  //     var ts: TickerSymbol = {
  //       DisplayName: symbol[0].replace('USDT', '').replace('_', ''),
  //       CurrencyPair: symbol[0],
  //       LastValue: symbol[1],
  //       LowestAsk: symbol[2],
  //       HighestBid: symbol[3],
  //       PercentChange: Number(symbol[4]) * 100.0,
  //       BaseVolume: symbol[5],
  //       QuoteVolume: symbol[6],
  //       IsFrozen: symbol[7],
  //       High24Hr: symbol[8],
  //       Low24Hr: symbol[9],
  //       State: 'normal'
  //     };

  //     var index = this.ticker.findIndex((i) => { return i.CurrencyPair == ts.CurrencyPair });

  //     if (index > -1) {

  //       //this.ticker[index].State = 'normal';

  //       //console.log(`Replacing TickerSymbol at index ${index}`);

  //       if (this.ticker[index].PercentChange < ts.PercentChange) {
  //         ts.State = 'positive';
  //         //console.log(`${ts.DisplayName} has ${ts.State} change`);
  //       } else if (this.ticker[index].PercentChange > ts.PercentChange) {
  //         ts.State = 'negative';
  //         //console.log(`${ts.DisplayName} has ${ts.State} change`);
  //       } else {
  //         //console.log(`No state change for ${ts.DisplayName}. Old: ${this.ticker[index].PercentChange}, New: ${ts.PercentChange}`);
  //       }

  //       this.ticker[index] = ts;
  //     } else {
  //       //console.log(`Adding new TickerSymbol ${ts.CurrencyPair}`);
  //       this.ticker.push(ts);
  //     }

  //     if (update) {
  //       this.tickerSubject.next(this.ticker);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // public getChartData(currencyPair, start, end, period): Promise<SymbolChartData[]> {
  //   return new Promise<SymbolChartData[]>(function (res, rej) {
  //     this.http.get(this.apiUrlBase + `returnChartData&currencyPair=${currencyPair}&start=${start}&end=${end}&period=${period}`).map(res => res.json()).subscribe(data => {
  //       try {
  //         var chartData: SymbolChartData[] = [];

  //         for (var entry in data) {
  //           var sData : SymbolChartData = {
  //             Close: data[entry]["close"],
  //             Date: data[entry]["date"],
  //             High: data[entry]["high"],
  //             Low: data[entry]["low"],
  //             Open: data[entry]["open"],
  //             QuoteVolume: data[entry]["quotedVolume"],
  //             Volume: data[entry]["volume"],
  //             WeightedAverage: data[entry]["weightedAverage"]
  //           };

  //           chartData.push(sData);
  //         }

  //         res(chartData);
  //       } catch (err) {
  //         console.log(err);
  //         rej();
  //       }
  //     });
  //   }.bind(this));
  // }

  // private getChartDataPromise(res, rej) {

  // }
}
