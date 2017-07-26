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

  public ticker: Array<TickerSymbol> = new Array<TickerSymbol>();
  public tickerSubject: BehaviorSubject<Array<TickerSymbol>> = new BehaviorSubject([]);
  public ticker$: Observable<Array<TickerSymbol>> = this.tickerSubject.asObservable();
  public isConnected: boolean = false;

  constructor(public http: Http) {
    //TODO: Need to get data from http first since poloniex is slow.
   /*  this.http.get('https://poloniex.com/public?command=returnTicker').map(res => res.json()).subscribe(data => {
        this.ticker = data;
    }); */

    this.conn = new Connection({ url: 'wss://api.poloniex.com', realm: 'realm1', retry_delay_growth: 0, max_retries: -1, initial_retry_delay: 1 });
    this.conn.onopen = (session) => {
      console.log('connected');
      this.isConnected = true;
      this.session = session;
      session.subscribe('ticker', this.onTickerData.bind(this)).then((sub) => { this.subscription = sub; });
    };
    this.conn.open();
    setTimeout(function() {
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

  private onTickerData(data: any) {
    try {
      var symbol = data;

      if (!symbol[0].includes("USDT")) {
        console.log('Symbol skipped')
        return;
      }

      console.log(data);

      var ts: TickerSymbol = {
        CurrencyPair: symbol[0],
        LastValue: symbol[1],
        LowestAsk: symbol[2],
        HighestBid: symbol[3],
        PercentChange: symbol[4],
        BaseVolume: symbol[5],
        QuoteVolume: symbol[6],
        IsFrozen: symbol[7],
        High24Hr: symbol[8],
        Low24Hr: symbol[9]
      };

      var index = this.ticker.findIndex((i) => { return i.CurrencyPair == ts.CurrencyPair });

      if (index > -1) {
        console.log(`Replacing TickerSymbol at index ${index}`);

        this.ticker[index] = ts;
      } else {
        console.log(`Adding new TickerSymbol ${ts.CurrencyPair}`);
        this.ticker.push(ts);
      }

      this.tickerSubject.next(this.ticker);

    } catch (err) {
      console.log(err);
    }
  }
}
