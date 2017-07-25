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
    console.log(data);

    var symbol = JSON.parse(data);

    if (!symbol[0].includes("USDT")) {
      console.log('Symbol skipped')
      return;
    }

    var ts : TickerSymbol;
    ts.CurrencyPair = symbol[0];
    ts.LastValue = symbol[1];
    ts.LowestAsk = symbol[2];
    ts.HighestBid = symbol[3];
    ts.PercentChange = symbol[4];
    ts.BaseVolume = symbol[5];
    ts.QuoteVolume = symbol[6];
    ts.IsFrozen = symbol[7];
    ts.High24Hr = symbol[8];
    ts.Low24Hr = symbol[9];

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
