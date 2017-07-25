import { Injectable, OnDestroy } from '@angular/core';
import { Connection } from 'autobahn';
import { TickerSymbol } from '../models';

@Injectable()
export class ExchangeService implements OnDestroy {

  private conn;
  private session;

  public ticker: TickerSymbol[] = [];
  public isConnected: boolean = false;

  constructor() {
    this.conn = new Connection({ url: 'wss://api.poloniex.com', realm: 'realm1' });
    this.conn.onopen = (session) => {
      console.log('connected');
      this.isConnected = true;
      this.session = session;
      session.subscribe('ticker', this.onTickerData);
    };
    this.conn.open();
  }

  ngOnDestroy() {
    if (this.conn) {
      this.conn.close();
    }
  }

  private onTickerData(data: any) {
    var symbol = data;

    if (!symbol[0].includes("_USDT")) {
      console.log('Symbol skipped')
      return;
    }

    console.log(data);

    var ts : TickerSymbol = {
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

    var index = this.ticker.findIndex((i) => { return i.CurrencyPair == ts.CurrencyPair});

    if (index > -1) {
      console.log(`Replacing TickerSymbol at index ${index}`);

      this.ticker[index] = ts;
    } else {
      console.log(`Adding new TickerSymbol ${ts.CurrencyPair}`);
      this.ticker.push(ts);
    }
  }
}
