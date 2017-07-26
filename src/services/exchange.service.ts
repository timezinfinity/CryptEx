import { Injectable, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Connection } from 'autobahn';
import { TickerSymbol } from '../models';

@Injectable()
export class ExchangeService implements OnDestroy {
  @Output() tickerUpdate: EventEmitter<any>;

  private conn;
  private session;
  private subscription;

  public ticker: TickerSymbol[] = [];
  public isConnected: boolean = false;

  constructor() {
    this.tickerUpdate = new EventEmitter();

    this.conn = new Connection({ url: 'wss://api.poloniex.com', realm: 'realm1', retry_delay_growth: 0, max_retries: -1, initial_retry_delay: 1 });
    this.conn.onopen = (session) => {
      console.log('connected');
      this.isConnected = true;
      this.session = session;
      session.subscribe('ticker', this.onTickerData).then((sub) => { this.subscription = sub; });
    };
    this.conn.open();
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

      console.log(ts);

      if (!this.ticker) {
        this.ticker = [];
      }

      var index = this.ticker.findIndex((i) => { return i.CurrencyPair == ts.CurrencyPair });

      if (index > -1) {
        console.log(`Replacing TickerSymbol at index ${index}`);

        this.ticker[index] = ts;
      } else {
        console.log(`Adding new TickerSymbol ${ts.CurrencyPair}`);
        this.ticker.push(ts);
      }

      this.tickerUpdate.emit(this.ticker);

    } catch (err) {
      console.log(err);
    }
  }
}
