import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Connection } from 'autobahn';
import { TickerSymbol } from '../models';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ExchangeService implements OnDestroy {

  private conn;
  private session;
  private subscription;
  private interval;

  public ticker: Array<TickerSymbol> = new Array<TickerSymbol>();
  public tickerSubject: BehaviorSubject<Array<TickerSymbol>> = new BehaviorSubject([]);
  public ticker$: Observable<Array<TickerSymbol>> = this.tickerSubject.asObservable();
  public isConnected: boolean = false;

  constructor(public http: Http) {
    this.interval = setInterval(this.getTickerDataRestfully.bind(this), 5000);

    this.conn = new Connection({ url: 'wss://api.poloniex.com', realm: 'realm1', retry_delay_growth: 0, max_retries: -1, initial_retry_delay: 1 });
    this.conn.onopen = (session) => {
      console.log('connected');
      this.isConnected = true;
      this.session = session;
      session.subscribe('ticker', this.onTickerData.bind(this)).then((sub) => { this.subscription = sub; });
    };
    this.conn.open();
    setTimeout(function () {
      if (!this.isConnected) {
        this.conn.close();
        this.conn.open();
      }
    }, 3000);
  }

  ngOnDestroy() {
    console.log('ExchangeService: OnDestroy');
    if (this.subscription) {
      if (this.session) {
        this.session.unsubscribe(this.subscription);
      }
    }

    if (this.conn) {
      this.conn.close();
    }
  }

  private getTickerDataRestfully() {
    if (this.isConnected) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      return;
    }

    this.http.get('https://poloniex.com/public?command=returnTicker').map(res => res.json()).subscribe(data => {
      try {
        for (var pair in data) {
          if (pair.includes("USDT")) {
            var symbol = [];
            symbol.push(pair);

            symbol.push(data[pair]["last"]);
            symbol.push(data[pair]["lowestAsk"]);
            symbol.push(data[pair]["highestBid"]);
            symbol.push(data[pair]["percentChange"]);
            symbol.push(data[pair]["baseVolume"]);
            symbol.push(data[pair]["quoteVolume"]);
            symbol.push(data[pair]["isFrozen"]);
            symbol.push(data[pair]["high24hr"]);
            symbol.push(data[pair]["low24hr"]);

            this.createUpdateTickerSymbol(symbol);
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  private onTickerData(data: any) {
    try {
      var symbol = data;

      if (!symbol[0].includes("USDT")) {
        console.log('Symbol skipped')
        return;
      }

      //console.log(data);

      this.createUpdateTickerSymbol(symbol);

    } catch (err) {
      console.log(err);
    }
  }

  private createUpdateTickerSymbol(symbol) {
    try {
      var ts: TickerSymbol = {
        DisplayName: symbol[0].replace('USDT', '').replace('_', ''),
        CurrencyPair: symbol[0],
        LastValue: symbol[1],
        LowestAsk: symbol[2],
        HighestBid: symbol[3],
        PercentChange: Number(symbol[4]) * 100.0,
        BaseVolume: symbol[5],
        QuoteVolume: symbol[6],
        IsFrozen: symbol[7],
        High24Hr: symbol[8],
        Low24Hr: symbol[9],
        State: 'normal'
      };

      var index = this.ticker.findIndex((i) => { return i.CurrencyPair == ts.CurrencyPair });

      if (index > -1) {

        this.ticker[index].State = 'normal';

        //console.log(`Replacing TickerSymbol at index ${index}`);

        if (this.ticker[index].PercentChange > ts.PercentChange) {
          ts.State = 'positive';
          console.log(`${ts.DisplayName} has ${ts.State} change`);
        } else if (this.ticker[index].PercentChange < ts.PercentChange) {
          ts.State = 'negative';
          console.log(`${ts.DisplayName} has ${ts.State} change`);
        } else {
          console.log(`No state change for ${ts.DisplayName}. Old: ${this.ticker[index].PercentChange}, New: ${ts.PercentChange}`);
        }

        this.ticker[index] = ts;
      } else {
        //console.log(`Adding new TickerSymbol ${ts.CurrencyPair}`);
        this.ticker.push(ts);
      }

      this.tickerSubject.next(this.ticker);
    } catch (err) {
      console.log(err);
    }
  }
}
